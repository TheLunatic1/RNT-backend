const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT sign error:', err);
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Register error details:', err.message); // ← This will print the real error!
    console.error('Full error stack:', err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message }); // Better response too
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT sign error:', err);
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login error details:', err.message);
    console.error('Full error stack:', err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};