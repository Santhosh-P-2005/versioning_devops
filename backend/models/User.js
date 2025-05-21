const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  kural: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  no: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
