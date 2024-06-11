const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// Register user controller
exports.register = async (req, res) => {
  const { name, username, password, email } = req.body;
  try {
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({ name, username, email, password: hashedPassword });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with a success message and the generated token
    res.status(201).json({ message: 'Registered', token });
  } catch (error) {
    // Handle any errors that occur during registration
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};


// Login user controller
exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ message: 'Login failed due to server error' });
    }
    if (!user) {
      console.error('Authentication failed:', info);
      return res.status(400).json({ message: 'Login failed', info });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Login failed due to server error' });
      }

      try {
        // Generate access token
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return response
        return res.json({
          status: 200,
          data: {
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              name: user.name,
              __v: user.__v
            },
            accessToken
          },
          message: "logged in successfully"
        });
      } catch (error) {
        console.error('Token generation error:', error);
        return res.status(500).json({ message: 'Login failed due to token generation error' });
      }
    });
  })(req, res, next);
};

// Logout user controller
exports.logout = async (req, res) => {
  try {
    // Just respond with a success message. Token invalidation is handled on the client side.
    return res.json({
      status: 200,
      data: {},
      message: 'logged out successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Logout failed' });
  }
};

// Controller to update a user by ID
exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { username, email, name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { username, email, name }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('update error:', error);
    res.status(500).json({ error: 'Profile update failed' });
  }
};
