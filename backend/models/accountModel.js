const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Account', accountSchema);