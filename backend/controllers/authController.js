const login = (req, res) => {
    console.log(`Logged in ${req.user._id}!`);
    res.send('Login successful');
};

const logout = (req, res, next) => {
    const username = req.user.username
    req.logout((err) => {
        if (err) { 
            res.status(400).send();
            return next(err); 
        }
        console.log(`Logged out ${username}!`);
        res.status(200).send();
    });
};

module.exports = {
    login,
    logout
};