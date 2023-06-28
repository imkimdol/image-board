require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Account = require('./models/accountModel');

const app = express();

const mongooseInit = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_LINK);
    console.log(`Connected to MongoDB!`);
}

const passportInit = async () => {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const res = await Account.findById(username);
            if (!res) { return done(null, false, { message: 'Incorrect username or password.' }); }

            if (!bcrypt.compareSync(password, res.password)) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, res);
        } catch (err) {
            console.error(err);
            return done(err);
        }
    }));

    passport.serializeUser((res, done) => {
        process.nextTick(() => {
            done(null, { username: res._id });
        });
    });
      
    passport.deserializeUser((user, done) => {
        process.nextTick(() => {
            done(null, user);
        });
    });
};

const expressInit = async () => {
    const corsConfig = {
        origin: ['http://localhost:3000', 'http://lodmik.top'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
    const key = Math.random().toString();

    app.use(cors(corsConfig));
    app.use(express.json());
    app.use(session({ secret: key, resave: false, saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/accounts', require('./routes/accounts'));
    app.use('/posts', require('./routes/posts'));
    app.use('/images', require('./routes/images'));
    app.use('/tags', require('./routes/tags'));
    app.use('/auth', require('./routes/auth'));

    const port = process.env.PORT;
    await app.listen(port);
    console.log(`Server ready on port ${port}!`);
}

const init = async () => {
    try {
        await mongooseInit();
        await passportInit();
        await expressInit();
    } catch(err) {
        console.error(err); 
    };
};
 
init();