const Notification = require('../models/notificationModel');

const createNotification = async (message) => {
  try {
    const notification = new Notification({ message });
    await notification.save();
    return notification;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createNotification };
