const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema(
  {
    duration: {
      type: String,
      default: "",
    },
    // startDate: {
    //   type: String,
    //   default: "",
    // },
    // endDate: {
    //   type: String,
    //   default: "",
    // },
    paymentAmount: Number,
    paymentStatus: {
      type: Boolean,
      default: false,
    },

    // tenantId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Tenant",
    // },
    // ownerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "HomeOwner",
    // },
    // homeId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Houses",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rent", rentSchema);
