const paymentModel = require("../models/paymentModel");
var request = require("request");
const generateRandomCharacterSet = require("../authController/randomCharater");
const applicationModel = require("../models/applicantModel");
const smsService = require("../authController/smsService");
const moment = require("moment");

//functions to process pyment
// application id from front end is used as unique character her
const pay = async (req, res) => {
  const randomChar = generateRandomCharacterSet();
  console.log(req.body);

  const {
    email,
    name,
    phone,
    amount,
    reciepentId,
    homeId,
    payerId,
    lastName,
    applicationId,
  } = req.body;
  const payment = await paymentModel.create({
    email: email,
    amount: amount,
    phone: phone,
    payerId: payerId,
    reciepentId: reciepentId,
    homeId: homeId,
    randomChar: randomChar,
    applicationId: applicationId,
  });
  var options = {
    method: "POST",
    url: "https://api.chapa.co/v1/transaction/initialize",
    headers: {
      Authorization: "Bearer CHASECK_TEST-1wysCA5FZesSOAlsuCc9bHiNzFU7Y9bp",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      currency: "ETB",
      email: email,
      first_name: name,
      last_name: lastName,
      phone_number: "0908080808",
      tx_ref: applicationId + randomChar,
      callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      return_url: `http://localhost:3000/payment/verify/${applicationId}`,
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "I love online payments",
    }),
  };
  request(options, function (error, response) {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: "failed", data: null });
    }
    const responseBody = JSON.parse(response.body);
    console.log(responseBody);
    if (responseBody.status == "failed") {
      return res.status(201).json({ status: "failed", data: null });
    }

    return res.status(200).json({
      status: "success",
      data: responseBody.data.checkout_url,
      applicationId: applicationId,
    });
  });

  // user identify by the cookie

  // sending request saving the textref with user

  // accept the payment link

  /// send to the front end

  // sending the textref parameter with the hee=ader beare token secrect key
  // const data = req.body;

  // try {
  //   const payment = await paymentMode.create(data);
  //   return res.status(201).json(payment);
  // } catch (error) {
  //   return res.status(501).json(error);
  // }
};
//verfi payment chappa second api
const verifyPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const moment = require("moment");
    console.log("updating payment status");

    const application = await applicationModel.findById(id);

    // Add 30 days to the existing payment expiry date
    const newPaymentExpiryDate = moment(application.paymentExpiryDate)
      .add(30, "days")
      .toDate();

    // Update the payment expiry date in the application model
    application.paymentExpiryDate = newPaymentExpiryDate;

    console.log("date", application.paymentExpiryDate);
    if (moment(application.paymentExpiryDate).isAfter(moment())) {
      application.paymentStatus = true;
    } else {
      application.paymentStatus = false;
    }

    await application.save();

    console.log("Application updated successfully:", application);
  } catch (error) {
    console.log("Error updating application:", error);
  }
  try {
    smsService.sendSMS("+2510977439777", "payment has been made");
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ status: "success", data: null });
};

// delete payment object by id
const deletePayment = async (req, res) => {
  console.log("delete function called");
  //console.log(req);
  const id = req.query;
  try {
    const result = await paymentMode.findByIdAndDelete(id);
    if (!result) {
      return res.status(401).json({ message: "informtion not found" });
    }
  } catch (error) {
    return res.status(501).josn(error);
  }
};
const editPayment = async (req, res) => {
  let id = req.body.id;
  try {
    const updateResult = await paymentModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (!updateResult) {
      return res.status(401).json({ message: "information not found " });
    }
  } catch (error) {
    return res.status(501).json(error);
  }
};

//retrive payment information
const getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await paymentModel.findById(id);
    if (!payment) {
      return res.status(401).json;
    }
  } catch (error) {}
};

module.exports = {
  pay,
  deletePayment,
  editPayment,
  getSingle,
  verifyPayment,
};
