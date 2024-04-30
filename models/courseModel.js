const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  code: { type: String, required: true},
  description: { type: String, required: true},
  credit: { type: Number, required: true},
  categories: { type: mongoose.Schema.Types.ObjectId,ref:'Category', required: false},
});

module.exports = mongoose.model('Course', courseSchema);
