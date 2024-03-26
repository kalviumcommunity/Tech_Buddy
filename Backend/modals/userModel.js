const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: function(username) {
        return /^[A-Z]/.test(username);
      },
      message: 'Username must start with a capital letter'
    }
  },
  password: {
    type: String,
  }
});


module.exports = mongoose.model('User', userSchema);
