const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OwnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: "",
    },
    subCity: {
      type: String,
      default: "",
    },
    woreda: {
      type: String,
      default: "",
    },
    kebele: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: Boolean,
      default: true,
    },
    house: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Houses",
      },
    ],
    applicationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    saleId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale",
      },
    ],
    rentId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rent",
      },
    ],
    requestId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maintenance",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeOwner", OwnerSchema);
