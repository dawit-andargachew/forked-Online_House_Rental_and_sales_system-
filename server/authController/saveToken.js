// In tokenService.js module
const tokenModel = require("../models/authModel");

async function generateVerificationToken(email) {
  // random token
  const verificationToken =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  const expiryDate = new Date(Date.now() + 3600000); // set expiry to 1 hour from now
  const newToken = new tokenModel({
    email: email,
    token: verificationToken,
    expiresAt: expiryDate,
  });
  // save to database
  await newToken.save();
  return verificationToken;
}

// Function to verify token and retrieve user
const verifyToken = async (email, token, userModel) => {
  // remove the token from the database if aavilable
  const userToken = await tokenModel.findOneAndDelete({
    email,
    token: token,
    expiresAt: { $gt: Date.now() },
  });
  if (!userToken) {
    throw new Error("Invalid or expired token");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  // remove the token from the database

  return user;
};

module.exports = {
  verifyToken,
  generateVerificationToken,
};
