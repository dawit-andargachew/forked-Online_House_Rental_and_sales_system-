const mongoose = require("mongoose");
const adminModel = require("../models/adminModel");
const login = require("../authController/login");
const {
  initiatePasswordReset,
  resetPassword,
} = require("../authController/passwordReset");
const { hashPassword } = require("../authController/passwordHash");
const getUser = require("../authController/authorize");
const { changePassword } = require("../authController/changePassword");
const { generateToken } = require("../authController/auth");

// admin log in
const adminLogin = async (req, res) => {
  await login(req, res, adminModel);
};

// get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find({});
    res.status(200).json(admins);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get single admin
const getAdmin = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such " });
  }
  const admin = await adminModel.findById(id);
  if (!admin) {
    return res.status(404).json({ error: "No such admin" });
  }
  res.status(200).json(admin);
};
// add admin
const addAdmin = async (req, res) => {
  // const { id } = await getUser(req, res);
  // const admin = await adminModel.findById(id)
  // if (!admin || admin.superAdmin == false) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }
  console.log("this is body", req.body);
  const data = req.body;
  const name = data.name;
  const lastName = data.lastName;
  const phone = data.phone;
  const email = data.email;
  const password = data.password;
  const image = data.image;
  const isTaken = await adminModel.findOne({ email });
  if (isTaken) {
    return res
      .status(200)
      .send("Your email is already taken, use another email.");
  }

  console.log("body", password);
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    const admin = await adminModel.create({
      lastName,
      image,
      superAdmin: false,
      name,
      email,
      // suspended,
      // accountStatus,
      phone,
      password: hashedPassword,
      phone,
    });
    await admin.save();
    const token = generateToken(admin._id);
    res.status(200).json({ user: admin, token: token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delet admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }

  try {
    // Find admin in database
    const admin = await adminModel.findById(id);

    if (!admin) {
      return res.status(400).json({ error: "No such admin" });
    }

    // Delete admin from database
    await adminModel.findByIdAndDelete(id);

    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//update admin

const updateAdmin = async (req, res) => {
  // const id = await getUser(req, res);

  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }
  const admin = await adminModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!admin) {
    return res.status(400).json({ error: "No such admin" });
  }
  res.status(200).json(admin);
};

// change password
const updatePassword = async (req, res) => {
  await changePassword(req, res, adminModel);
};

const passwordResetRequest = async (req, res) => {
  await initiatePasswordReset(req, res, adminModel);
};
const resetPasswordProcess = async (req, res) => {
  await resetPassword(req, res, adminModel);
};

module.exports = {
  addAdmin,
  getAllAdmins,
  getAdmin,
  deleteAdmin,
  updateAdmin,
  adminLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword,
};
