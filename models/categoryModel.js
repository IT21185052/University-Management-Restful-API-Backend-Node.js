const mongoose = require('mongoose');

//define mode for faculty Type/Category
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
