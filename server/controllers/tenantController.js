const mongoose = require("mongoose");
const tenantModel = require("../models/tenantModel");
const login = require("../authController/login");
const {
  initiatePasswordReset,
  resetPassword,
} = require("../authController/passwordReset");
const { hashPassword } = require("../authController/passwordHash");
const getUser = require("../authController/authorize");
const { changePassword } = require("../authController/changePassword");
const verifyEmail = require("../authController/accountActivation");
const { generateVerificationToken } = require("../authController/saveToken");
const sendVerificationEmail = require("../authController/sendEmial");
const { generateToken } = require("../authController/auth");

// tenant log in
const tenantLogin = async (req, res) => {
  // const useType = "tenant";
  await login(req, res, tenantModel);
};

// get all tenants
const getAllTenants = async (req, res) => {
  try {
    const tenants = await tenantModel.find({});

    res.status(200).json(tenants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getAllBuyers = async (req, res) => {
  try {
    const tenants = await tenantModel.find({userType:"buyer"});

    res.status(200).json(tenants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get single tenant
const getTenant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such " });
  }

  const tenant = await tenantModel.findById(id);

  if (!tenant) {
    return res.status(404).json({ error: "No such tenant" });
  }

  res.status(200).json({ tenant });
};

// register tenant
const registerTenant = async (req, res) => {
  console.log("this is body", req.body);
  const data = req.body;
  const name = data.name;
  const lastName = data.lastName;
  const phone = data.phone;
  const email = data.email;
  const password = data.password;
  const city = data.city;
  const subCity = data.subCity;
  const kebele = data.kebele;
  const saleId = [];
  // const suspended = data.suspended;
  // const accountStatus = data.accountStatus;
  const aplicationId = [];
  const rentId = [];
  const userType = data.userType;
  const image = data.image;
  const isTaken = await tenantModel.findOne({ email });
  if (isTaken) {
    return res
      .status(200)
      .send("Your email is already taken, use another email");
  }
  console.log("body", password);

  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    const tenant = await tenantModel.create({
      lastName,
      image,
      userType,
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
      aplicationId,
      saleId,
    });
    // generate and save token to verify email and activate account
    const verificationToken = await generateVerificationToken(email);

    // Send email verification email to the newly registered user
    let subject = "Account activation";
    let text = `Please click the following link to verify your email address: ${process.env.BASE_URL}/tenant/verify-email/${verificationToken}`;
    await sendVerificationEmail(email, subject, text);
    const token = generateToken(tenant._id);
    res.status(200).send("check your email");
    // res.status(200).json({ token, user: tenant });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// activat account by verifying email
const activateAccount = async (req, res) => {
  await verifyEmail(req, res, tenantModel);
};

// delet tenant
const deleteTenant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }

  try {
    // Find tenant in database
    const tenant = await tenantModel.findById(id);

    if (!tenant) {
      return res.status(400).json({ error: "No such tenant" });
    }

    // Delete tenant from database
    await tenantModel.findByIdAndDelete(id);

    res.status(200).json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//update tenant

const updateTenant = async (req, res) => {
  // const id = await getUser(req, res);
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }
  const tenant = await tenantModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!tenant) {
    return res.status(400).json({ error: "No such tenant" });
  }
  res.status(200).json(tenant);
};

// change password
const updatePassword = async (req, res) => {
  await changePassword(req, res, tenantModel);
};

const passwordResetRequest = async (req, res) => {
  await initiatePasswordReset(req, res, tenantModel);
};
const resetPasswordProcess = async (req, res) => {
  await resetPassword(req, res, tenantModel);
};

module.exports = {
  registerTenant,
  getAllTenants,
  getTenant,
  deleteTenant,
  updateTenant,
  tenantLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword,
  activateAccount,
  getAllBuyers,
};
