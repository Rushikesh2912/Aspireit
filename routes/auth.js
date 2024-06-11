//importing required modules
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

//utilising the imported controllers for routers

router.post('/register', register);
router.post('/login', login);

module.exports = router;
