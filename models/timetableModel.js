const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  course_name: { type: mongoose.Schema.Types.ObjectId,ref:'Course', required: true},
  faculty: { type: mongoose.Schema.Types.ObjectId,ref:'Category', required: true},
  time: { type: String, required: true},
  location: { type: mongoose.Schema.Types.ObjectId,ref:'Room', required: true},
});

module.exports = mongoose.model('Timetable', timetableSchema);
