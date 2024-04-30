const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Add any other relevant fields
});

module.exports = mongoose.model('Notification', notificationSchema);
