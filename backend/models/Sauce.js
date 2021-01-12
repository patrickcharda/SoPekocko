const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true }, 
  manufacturer: { type: String, required: true },
  description: { type: String, required:true},
  mainPepper: { type: String, required:true},
  imageUrl: { type: String},
  heat: { type: Number },
  likes:{ type: Number },
  usersLiked: [{ userId: String }],
  usersDisliked: [{ userId: String }],
});

module.exports = mongoose.model('Sauce', sauceSchema);