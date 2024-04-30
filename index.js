require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use(express.static('public'));

//auth Route
const authRoute = require('./routes/authRoute');
app.use('/api',authRoute);

//admin Route
const adminRoute = require('./routes/adminRoute');
app.use('/api/admin',adminRoute);

//common Route
const commonRoute = require('./routes/commonRoute');
app.use('/api',commonRoute);

// Start server
const PORT = process.env.SERVER_PORT || 3000;
const DB_URL = 'mongodb+srv://Admin:Physics9900@timetablebackend.e2qbmla.mongodb.net/?retryWrites=true&w=majority&appName=TimeTableBackend';

mongoose.connect(DB_URL)
.then(() =>{
     console.log('MongoDB connected');
})
.catch((err) => console.log('DB Connection Error',err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
