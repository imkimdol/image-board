const express = require('express');
const { getTags, getTag, postTag, deleteTag, } = require('../controllers/tagController');

const router = express.Router()

router.get('/', getTags);
router.post('/', postTag);

router.get('/:name', getTag);
router.delete('/:name', deleteTag);

module.exports = router;