const Tag = require('../models/tagModel');
const mongoose = require('mongoose');


const getTags = async (req, res) => {
    const tags = await Tag.find({}).sort({createdAt: -1});
    res.status(200).json(tags);
};

const getTag = async (req, res) => {
    const { name } = req.params;
    const tag = await Tag.findOne({ _id: name });
  
    if (!tag) {
      return res.status(404).json({error: 'Post not found'});
    }
  
    res.status(200).json(tag);
};

const postTag = async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
        return res.status(400).json({ err: 'Name missing!!' })
    }
    
    try {
        const dbResponse = await Tag.create({ _id: name });
        res.status(200).json(dbResponse);
    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};

const deleteTag = async (req, res) => {
    const { name } = req.params;
    const tag = await Tag.findByIdAndDelete(name);
  
    if (!tag) {
        return res.status(404).json({error: 'Account not found'});
    }
    res.status(200).json(tag);
};

module.exports = {
    getTags,
    getTag,
    postTag,
    deleteTag,
};