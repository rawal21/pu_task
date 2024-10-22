const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gmail: { type: String, required: true, unique: true }, // Added Gmail field
  tokens: [
    {
      token: String,
      deviceInfo: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

// Hash password before saving the user model
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate JWT and add it to the user's token array
userSchema.methods.generateAuthToken = async function (deviceInfo) {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  user.tokens = user.tokens.concat({ token, deviceInfo });

  if (user.tokens.length > 3) {
    user.tokens.shift(); // Remove oldest token if more than 3
  }

  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
