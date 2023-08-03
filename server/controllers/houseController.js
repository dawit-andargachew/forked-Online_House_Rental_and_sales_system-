const mongoose = require("mongoose");
const houseModel = require("../models/homeModel");
const getUser = require("../authController/authorize");
const ownerModel = require("../models/ownerModel");
const util = require("util");
const homeModel = require("../models/homeModel");

// get all houses and filter by the given parametr for analaysis
// recive number of bed rooms and location and search from home collection
// calculate avarage price , maximun and mininum price
const getAnalysis = async (req, res) => {
  const { bedRoom, subCity, bathRoom, homeType, area } = req.body;


  // Generate price suggestion based on area, bedrooms, and bathrooms
  function generatePriceSuggestion(area, bedrooms, bathrooms, homeType, subCity) {

    const subcityScales = {
      "bole": 3.8,
      "arada": 3.5,
      "lideta": 3.1,
      "kirkos": 2.8,
      "yeka": 2.1,
      "addis ketema": 1.5,
      "nifas silk-safto": 1.1,
      "gullele": 0.8,
      "kolfe keranio": 0.6,
      "akaky kaliti": 0.3,
    };
    const cityValue = subcityScales[subCity.toLowerCase()]

    // Define base price per unit area (in your desired currency)
    const basePricePerArea = 40;
    const bedroomModifier = 2000; // Additional price per bedroom
    const bathroomModifier = 800; // Additional price per bathroom

    // Calculate price based on area, bedrooms, and bathrooms
    const areaPrice = area * basePricePerArea;
    const bedroomsPrice = bedrooms * bedroomModifier;
    const bathroomsPrice = bathrooms * bathroomModifier;

    // Calculate the minimum and maximum prices
    let minPrice = areaPrice/2 + bedroomsPrice + bathroomsPrice;
    let maxPrice = minPrice + (areaPrice / bathRoom)/3 * (bedRoom * 0.5);
    let minAverage = 0
    let maxAverage = 0

    if (homeType === 'shortTermRent') {
      minPrice /= 25
      maxPrice /= 20
    } else if (homeType === 'sale') {
      minPrice *= 350
      maxPrice *= 650
    }

    //  use city factor
    minPrice = minPrice + (minPrice * cityValue) / 2
    maxPrice = maxPrice + (maxPrice * cityValue) / 1.6
    minAverage = minPrice + (minPrice * 0.25)
    maxAverage = maxPrice - (maxPrice * 0.4)


    // Return the price suggestion as an object
    return {
      minPrice: Math.floor(minPrice),
      maxPrice: Math.floor(maxPrice),
      minAverage: Math.floor(minAverage),
      maxAverage: Math.floor(maxAverage)
    };
  }
  try {
    const data = generatePriceSuggestion(area, bedRoom, bathRoom, homeType, subCity)

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all Houses
const getAllHouses = async (req, res) => {
  console.log(req);
  try {
    const houses = await houseModel.find().populate("ownerId");
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get houses that belowng to same person
const getHousesByOwner = async (req, res) => {
  const ownerId = req.params;
  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(404).json({ error: "Invalid ownerId" });
  }

  try {
    const houses = await houseModel
      .find({ ownerId: ownerId })
      .populate("ownerId");
    if (!houses || houses.length === 0) {
      return res.status(404).json({ error: "No houses found for ownerId" });
    }
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHouse = async (req, res) => {
  const houseId = req.params;
  if (!mongoose.Types.ObjectId.isValid(houseId)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  try {
    const house = await houseModel.findById(houseId).populate("ownerId");
    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    res.status(200).json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// add houses
const addHouse = async (req, res) => {
  const data = req.body; // parse the data string
  console.log(data);
  try {
    const house = await houseModel.create({ ...data });
    // add the house id to its owenr
    console.log("id owner", req.body.ownerId);
    const owner = await ownerModel.findOneAndUpdate(
      { _id: req.body.ownerId },
      { $push: { house: house._id } }, // push the ID of the new house to the 'houses' array attribute
      { new: true } // return the updated owner document
    );
    // save the owner
    await owner.save();

    res.status(200).json({ message: "You have added House", house: house });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteHouse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  try {
    // Find the house and retrieve the ownerId
    const house = await houseModel.findById(id);
    if (!house) {
      return res.status(404).json({ error: "No such house" });
    }
    const ownerId = house.ownerId;

    // Delete house from database
    const deletedHouse = await houseModel.findByIdAndDelete(id);
    if (!deletedHouse) {
      return res.status(400).json({ error: "Failed to delete the house" });
    }

    // Remove houseId from ownerModel
    const owner = await ownerModel.findById(ownerId);
    if (owner) {
      const houseIndex = owner.house.indexOf(id);
      if (houseIndex !== -1) {
        owner.house.splice(houseIndex, 1);
        await owner.save();
      }
    }

    return res
      .status(200)
      .json({ message: "Deletion successful", deletedHouse });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//update House
const updateHouse = async (req, res) => {
  const houseId = req.body.id;
  console.log("body", req.body);

  try {
    const updated = await houseModel.findOneAndUpdate(
      { _id: houseId },
      { ...req.body },
      { new: true, runValidators: true } // set `runValidators` to true to validate the updated data
    );
    if (!updated) {
      return res.status(400).json({ error: "No such House" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletImage = async (req, res) => {
  const { id, index } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }
  try {
    // retrive House from database
    const House = await houseModel.findById(id);
    if (!House) {
      return res.status(400).json({ error: "No such House" });
    }

    // Remove image name from images array
    House.images.splice(index, 1);
    await House.save();

    res.status(200).json(House);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addHouse,
  getAllHouses,
  getHouse,
  deleteHouse,
  updateHouse,
  deletImage,
  getHousesByOwner,
  getAnalysis,
};
