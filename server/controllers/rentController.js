const mongoose = require("mongoose");
const rentModel = require("../models/rentModel");
const tenantModel = require("../models/tenantModel");
const ownerModel = require("../models/ownerModel");
const homeModel = require("../models/homeModel");

// add rent information to database
const addRentInformation = async (req, res) => {
  try {
    const rentInfo = await rentModel.create(req.body);
    if (!rentInfo) {
      return res.status(404).json({ message: "Failed!" });
    }

    // Retrieve owner and tenant and add the id of the rent
    const tenant = await tenantModel.findOne(rentInfo.tenantId);
    const owner = await ownerModel.findOne(rentInfo.ownerId);
    const home = await homeModel.findOne(rentInfo.homeId);

    // Update with rent id
    tenant.rentId.push(rentInfo._id);
    owner.rentId.push(rentInfo._id);
    home.isRented = true;

    // Save both to the database
    await tenant.save();
    await owner.save();
    await home.save();

    // Update other applications to "rejected"
    await applicationModel.updateMany(
      { homeId: rentInfo.homeId },
      { $set: { status: "rejected" } }
    );

    // Update the application being changed to "rent" to "accepted"
    await applicationModel.findOneAndUpdate(
      {
        applicantId: req.body.tenantId,
        homeId: req.body.homeId,
      },
      { $set: { status: "accepted" } },
      { new: true }
    );

    return res.status(201).json({ message: "Rent information added!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//delete rent information
const deleteRentInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const rentInfo = await rentModel.findOneAndDelete(id);
    if (!rentInfo) {
      return res.status(400).json("no information found");
    }
    return res.status(201).json({ message: "deleted successfully" });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
// get rent information by id
const getRentInformationByID = async (req, res) => {
  try {
    const { id } = req.params;
    const information = await rentModel.findById(id);
    if (!information) {
      return res.status(400).json({ message: "empty list" });
    }
    return res.status(200).json(information);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error });
  }
};

// get all rent information
const getAllRent = async (req, res) => {
  try {
    const information = await rentModel.find({});
    if (!information) {
      return res.status(400).json({ message: "empty list" });
    }
    return res.status(200).json(information);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
const updateRent = async (req, res) => {
  const { id } = req.body;
  try {
    const rent = await rentModel.findByIdAndUpdate(id, { ...req.body });
    return res.status(201).send("Updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error occurred" });
  }
};
const getRentInformationByOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await rentModel.find({ ownerId: id }).populate("homeId");
    return res.status(200).json(rent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred" });
  }
};
const getRentInformationByTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await rentModel.find({ tenantId: id }).populate("homeId");
    return res.status(200).json(rent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred" });
  }
};
const getRentInformationByHome = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await rentModel.find({ homeId: id }).populate("homeId");
    return res.status(200).json(rent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred" });
  }
};

module.exports = {
  addRentInformation,
  deleteRentInformation,
  getRentInformationByID,
  getAllRent,
  updateRent,
  getRentInformationByHome,
  getRentInformationByTenant,
  getRentInformationByOwner,
};
