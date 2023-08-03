const mongoose = require('mongoose');

const passwordResetTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true, 
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  email: {    
    type:String,
    required: true,
  },
});

const tokenModel = mongoose.model('PasswordResetToken', passwordResetTokenSchema);

module.exports = tokenModel;
