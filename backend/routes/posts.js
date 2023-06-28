const express = require('express');
const controller = require('../controllers/postController');

const router = express.Router()

router.get('/', controller.getPosts);
router.post('/', controller.postPost);
router.get('/:id', controller.getPost);
router.delete('/:id', controller.deletePost);

// router.get('/:id/tags', controller.getTags);
// router.post('/:id/tags/', controller.addTag);
// router.delete('/:id/tags/:name', controller.deleteTag);

// router.get('/:id/likes', controller.getLikes);
// router.post('/:id/likes/', controller.addLike);
// router.delete('/:id/likes/:username', controller.deleteLike);

module.exports = router;