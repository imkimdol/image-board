const express = require('express');
const { getAccounts, getAccount, postAccount, deleteAccount } = require('../controllers/accountController');

const router = express.Router();

router.get('/', getAccounts);
router.post('/', postAccount);

router.get('/:username', getAccount);
router.delete('/:username', deleteAccount);

module.exports = router;