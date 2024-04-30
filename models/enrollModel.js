const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:'User'},
  course_id: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:'Course'}
});

module.exports = mongoose.model('Enroll', enrollSchema);
