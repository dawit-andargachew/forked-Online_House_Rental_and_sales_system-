const mongoose = require("mongoose");
const ownerModel = require("../models/ownerModel");
const houseModel = require("../models/homeModel");
const login = require("../authController/login");
const sendVerificationEmail = require("../authController/sendEmial");
const smsService = require("../authController/smsService");
const {
  initiatePasswordReset,
  resetPassword,
} = require("../authController/passwordReset");
const { hashPassword } = require("../authController/passwordHash");
const getUser = require("../authController/authorize");
const { changePassword } = require("../authController/changePassword");
const verifyEmail = require("../authController/accountActivation");
const { text } = require("body-parser");

const { generateVerificationToken } = require("../authController/saveToken");
const { generateToken } = require("../authController/auth");

// owner log in
const ownerLogin = async (req, res) => {
  // const userType = "owner";
  await login(req, res, ownerModel);
};

// get all owners
const getAllOwners = async (req, res) => {
  try {
    const owners = await ownerModel.find({});

    res.status(200).json(owners);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get single owner
const getOwner = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such " });
  }

  const owner = await ownerModel.findById(id);

  if (!owner) {
    return res.status(404).json({ error: "No such owner" });
  }

  res.status(200).json({ owner });
};
// register owner
const registerOwner = async (req, res) => {
  console.log("this is body", req.body);
  const data = req.body;
  const name = data.name;
  const lastName = data.lastName;
  const phone = data.phone;
  const email = data.email;
  // const suspended = data.suspended;
  // const accountStatus = data.accountStatus;
  const password = data.password;
  const city = data.city;
  const subCity = data.subCity;
  const kebele = data.kebele;
  const saleId = [];
  const aplicantId = [];
  const rentId = [];
  const image = data.image;

  // Check if email is already taken
  const isTaken = await ownerModel.findOne({ email });
  if (isTaken) {
    return res
      .status(401)
      .send("Your email is already taken, use another email");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  let session;
  try {
    session = await ownerModel.startSession(); // start a transaction
    session.startTransaction();

    const owner = await ownerModel.create(
      [
        {
          lastName,
          image,
          superowner: false,
          name,
          email,
          phone,
          // suspended,
          // accountStatus,
          password: hashedPassword,
          phone,
          city,
          subCity,
          kebele,
          rentId,
          aplicantId,
          saleId,
        },
      ],
      { session } // pass the session to the create method
    );

    // generate and save token to verify email and activate account
    const verificationToken = await generateVerificationToken(email);

    // Send email verification email to the newly registered user
    let subject = "Account activation";
    let text = `Please click the following link to verify your email address: ${process.env.BASE_URL}/owner/verify-email/${verificationToken}`;

    await sendVerificationEmail(email, subject, text);

    await session.commitTransaction(); // commit the transaction
    const token = generateToken(owner._id);
    console.log(owner[0]);
    try {
      await smsService.sendSMS("+2510977439777", "hello jossyy");
    } catch (error) {
      console.log(error);
    }
    // res.status(200).json({
    //   token: token,
    //   user: owner[0],
    //   message:
    //     "owner registered successfully. Please check your email for verification.",
    // });
    res.status(200).send("check your email");
  } catch (err) {
    if (session) {
      await session.abortTransaction(); // rollback the transaction if an error occurs
      session.endSession(); // end the session
    }
    res.status(400).send(err.message);
  } finally {
    if (session) {
      session.endSession(); // end the session
    }
  }
};

// activate account

const activateAccount = async (req, res) => {
  await verifyEmail(req, res, ownerModel);
};

const deleteOwner = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  try {
    // Find owner in database
    const owner = await ownerModel.findById(id);

    if (!owner) {
      return res.status(400).send("No such owner");
    }

    // Delete houses associated with the owner
    await houseModel.deleteMany({ ownerId: id });

    // Delete owner from database
    await ownerModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Deletion successful", owner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//update owner

const updateOwner = async (req, res) => {
  try {
    // const id = await getUser(req, res);

    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    const owner = await ownerModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!owner) {
      return res.status(400).json({ error: "No such owner" });
    }
    res.status(200).json(owner);
  } catch (error) {
    if (error.message === "Unauthorized") {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
};

// change password
const updatePassword = async (req, res) => {
  await changePassword(req, res, ownerModel);
};

const passwordResetRequest = async (req, res) => {
  await initiatePasswordReset(req, res, ownerModel);
};
const resetPasswordProcess = async (req, res) => {
  await resetPassword(req, res, ownerModel);
};

module.exports = {
  registerOwner,
  getAllOwners,
  getOwner,
  deleteOwner,
  updateOwner,
  ownerLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword,
  activateAccount,
};
