const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const authController = require('./controllers/authController');
const fileController = require('./controllers/fileController');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(passport.initialize());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/aspireit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Passport configuration
require('./config/passport')(passport);

// Auth routes
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', passport.authenticate('jwt', { session: false }), authController.logout);

// User routes
app.put('/users/:id', passport.authenticate('jwt', { session: false }), authController.updateUserById);

// File routes
app.post('/upload', passport.authenticate('jwt', { session: false }), fileController.upladMiddleware, fileController.uploadFile);
app.delete('/files/:id', passport.authenticate('jwt', { session: false }), fileController.deleteFileById);
o
// Serve static files (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
