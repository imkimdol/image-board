const Post = require('../models/postModel');
const mongoose = require('mongoose');

const { putImage, deleteImage } = require('./imageController');
const { checkAuthorized } = require('../helpers/miscHelpers');



const getPosts = async (req, res) => {
    const query = req.query;

    try {
        const posts = await Post.find(query).sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};

const getPost = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Invalid Post ID'});
    }
  
    const post = await Post.findById(id);
  
    if (!post) {
      return res.status(404).json({error: 'Post not found'});
    }
  
    res.status(200).json(post);
};

const postPost = async (req, res) => {
    console.log(req);
    const {imageURL, description} = req.body;
    
    let author;
    try {
        author = req.user.username;
        if (!author) {throw new Error()};
    } catch {
        res.status(400).json({ err: 'Error getting username' });
    }
        
    if (!imageURL) {
        res.status(400).json({ err: 'Missing imageURL' })
    }
    
    let id = null;
    try {
        const dbResponse = await Post.create({ author, description, tags: [], likes: [] });
        id = dbResponse.id;
        const conversionDetails = await putImage(id, imageURL);
        res.status(200).json({dbResponse, conversionDetails});
    } catch (error) {
        if (id) {await Post.findByIdAndDelete(id);}
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Invalid Post ID'});
    }
  
    const post = await Post.findById(id);
    if (!post) {
        return res.status(400).json({error: 'Post not found'});
    } else if (!checkAuthorized(req, post.author)) {
        return res.status(400).json({error: 'Not authorized!'});
    }

    try {
        await Post.findByIdAndDelete(id);
        await deleteImage(id);
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};



const getTags = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Invalid Post ID'});
    }
  
    const post = await Post.findById(id);
  
    if (!post) {
      return res.status(404).json({error: 'Post not found'});
    }
  
    res.status(200).json(post.tags);
};

const addTag = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid Post ID'});
    }
    
    const post = await Post.findById(id);
    if (!post) {
        return res.status(400).json({error: 'Post not found'});
    } else if (!checkAuthorized(req, post.author)) {
        return res.status(400).json({error: 'Not authorized!'});
    }

    try {
        await Post.findOneAndUpdate(
            { _id: id }, 
            { $addToSet: {tags: name} },
        );
        res.status(200).send();

    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};

const deleteTag = async (req, res) => {
    const { id, name } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid Post ID'});
    }

    const post = await Post.findById(id);
    if (!post) {
        return res.status(400).json({error: 'Post not found'});
    } else if (!checkAuthorized(req, post.author)) {
        return res.status(400).json({error: 'Not authorized!'});
    }

    try {
        await Post.findOneAndUpdate(
            { _id: id }, 
            { $pull: {tags: name} },
        );
        res.status(200).send();

    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};



const getLikes = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Invalid Post ID'});
    }
  
    const post = await Post.findById(id);
  
    if (!post) {
      return res.status(404).json({error: 'Post not found'});
    }
  
    res.status(200).json(post.likes);
};

const addLike = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid Post ID'});
    }

    const post = await Post.findById(id);
    if (!post) {
        return res.status(400).json({error: 'Post not found'});
    } else if (!checkAuthorized(req, username)) {
        return res.status(400).json({error: 'Not authorized!'});
    }

    try {username
        await Post.findOneAndUpdate(
            { _id: id }, 
            { $addToSet: {likes: username} },
        );
        res.status(200).send();

    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};

const deleteLike = async (req, res) => {
    const { id, username } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid Post ID'});
    }

    const post = await Post.findById(id);
    if (!post) {
        return res.status(400).json({error: 'Post not found'});
    } else if (!checkAuthorized(req, username)) {
        return res.status(400).json({error: 'Not authorized!'});
    }

    try {
        await Post.findOneAndUpdate(
            { _id: id }, 
            { $pull: {likes: username} },
        );
        res.status(200).send();

    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};



module.exports = {
    getPosts,
    getPost,
    postPost,
    deletePost,
    getTags,
    addTag,
    deleteTag,
    getLikes,
    addLike,
    deleteLike
};