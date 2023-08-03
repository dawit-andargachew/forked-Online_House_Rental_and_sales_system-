const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeSchema = new Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeOwner",
    },
    images: [String],

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
    price: Number,
    homeStatus: {
      type: String,
      default: "", /// holds ?????????????
    },
    verified: {
      type: Boolean,
      default: false, // verified or not
    },
    suspended: {
      type: Boolean,
      default: false, // suspended or ont
    },
    isRented: {
      type: Boolean,
      default: false, // boolean value rented or not
    },
    area: {
      type: Number,
      default: 0,
    },
    homeType: {
      type: String,
      default: "", // can be either regularRent, ShorteTerm ...
    },
    bedRoom: {
      type: Number,
      default: 0,
    },
    bathRoom: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    shortTerm: {
      checkin: String,
      checkout: String,
      maxGuest: String,
    },
    like: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    amenity: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Houses", HomeSchema);
