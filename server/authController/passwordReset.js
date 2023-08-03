const nodemailer = require("nodemailer");
const tokenModel = require("../models/authModel");
const { hashPassword } = require("./passwordHash");
const sendEmail = require("./sendEmial");
const { generateVerificationToken, verifyToken } = require("./saveToken");

// Function to initiate password reset process
const initiatePasswordReset = async (req, res, userModel) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  console.log("emial", email);
  console.log("user", user);

  try {
    // save the token
    const token = await generateVerificationToken(email);

    // send eamil with token
    let subject = "Password Reset Request";
    let text = `Hello ${user.name},\n\nYou recently requested to reset your password for your account. Please use the following code to reset your password:\n\n\n ${token}\n\n\nIf you did not request a password reset, please ignore this email.\n\nThanks,\n\n House Hub`;
    await sendEmail(email, subject, text);
    res.status(200).send("success");
  } catch (error) {
    res.status(200).send("Enter correct credentials, try again.");
  }
};

// Function to reset user password
const resetPassword = async (req, res, userModel) => {
  const { email, token, password } = req.body;
  try {
    const user = await verifyToken(email, token, userModel);

    //need to be hashed befor save
    user.password = await hashPassword(password);
    await user.save();
    res.status(200).send("Password reset successful");
  } catch (error) {
    res.status(200).send(error.message);
  }
};

module.exports = { initiatePasswordReset, resetPassword };
