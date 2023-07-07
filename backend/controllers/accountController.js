const bcrypt = require('bcrypt');
const Account = require('../models/accountModel');
const {checkAuthorized} = require('../helpers/miscHelpers');

const getAccounts = async (req, res) => {
    const account = await Account.find({}, { _id: true });
  
    if (!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    
    res.status(200).json(account);
};

const getAccount = async (req, res) => {
    const { username } = req.params;

    if (!checkAuthorized) {
        return res.status(400).json({error: 'Not authorized!'});
    }

    const account = await Account.findById(username);
  
    if (!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    
    res.status(200).json(account);
};

const postAccount = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
        return res.status(400).json({ err: 'Missing username and/or password!' });
    }

    try {
        const encyptedPass = await bcrypt.hash(password, 10);
        const dbResponse = await Account.create({ _id: username, password: encyptedPass });
        res.status(200).json(dbResponse);
    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};

const deleteAccount = async (req, res) => {
    const { username } = req.params;

    if (!checkAuthorized) {
        return res.status(400).json({error: 'Not authorized!'});
    }

    const account = await Account.findByIdAndDelete(username);
  
    if (!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    res.status(200).json(account);
};

module.exports = {
    getAccounts,
    getAccount,
    postAccount,
    deleteAccount,
};