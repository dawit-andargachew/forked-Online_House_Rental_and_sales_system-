const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    houseId: ObjectId,
    ownerId: ObjectId,
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
    },
    parentId: {
      type: ObjectId,
      default: null,
    },

    message: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);
