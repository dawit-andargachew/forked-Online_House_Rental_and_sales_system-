const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: Number,
    reciepentId: ObjectId,
    homeId: ObjectId,
    payerId: ObjectId,
    phone: String,
    name: String,
    lastName: String,
    email: String,
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
    randomChar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
