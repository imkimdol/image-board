const express = require('express');
const { getAccount, postAccount, deleteAccount } = require('../controllers/accountController');

const router = express.Router();

router.post('/', postAccount);

router.get('/:username', getAccount);
router.delete('/:username', deleteAccount);

module.exports = router;