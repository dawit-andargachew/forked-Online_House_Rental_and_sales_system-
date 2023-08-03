const tokenModel = require("../models/authModel");

const verifyEmail = async (req, res, userModel) => {
  const { token } = req.params;
  console.log("this is found", token);
  try {
    // Check if the token is valid and remove the verification token
    const userToken = await tokenModel.findOneAndDelete({
      token: token,
      expiresAt: { $gt: Date.now() },
    });
    console.log(userToken);
    if (!userToken) {
      return res.status(200).send("Invalid or expired token.");
    }

    // Update the account status to active
    const user = await userModel.findOne({ email: userToken.email });
    user.accountStatus = true;
    await user.save();
    const linkText = "Log in ";
    const linkUrl = "http://localhost:3000/login";
    const message = "Your accoutn is succesfully verified. <br/> click the button below to log in to your account";

    const htmlElementWithLink = `
<style>
    body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    
    .custom-button {
      background-color: blue;
      color: white;
    }
    
    .message {
      margin-bottom: 10px;
    }
  </style>
  <div class="message">${message}</div>
  <a href="${linkUrl}">
    <button class="custom-button">${linkText}</button>
  </a>
`;

    res.status(200).send(htmlElementWithLink);
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
};
module.exports = verifyEmail;
