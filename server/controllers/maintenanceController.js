const { findById, find } = require("../models/authModel");
const maintenanceModel = require("../models/maintenanceModel");

//send request

const sendMaintenance = async (req, res) => {
  console.log(req.body);

  try {
    const maintenance = await maintenanceModel.create(req.body);

    if (!maintenance) {
      return res.status(400).json({ message: "unable to send request" });
    }

    const owner = await findById(maintenance.ownerId);
    owner.requestId.push(maintenance._id);
    await owner.save();
    return res.status(201).json({ message: "request sent!" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// edit maintenace request

const editMaintenace = async (req, res) => {
  const id = req.body.id;
  try {
    const request_ = await maintenanceModel.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!request_) {
      return res.status(404).json({ message: "cant edit!" });
    }
    return res.status(201).json({ message: "edited succesfully" });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
// get all maintenance
const getMaintenance = async (req, res) => {
  try {
    const allRequest = await maintenanceModel.find();
    if (!allRequest) {
      return res.status(200).json({ message: "empty requests list" });
    }
    return res.status(200).json(allRequest);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
// get single maintenance

const getSingleMaintenance = async (req, res) => {
  try {
    const id = req.qurey;
    const singleRequest = await maintenanceModel.findOne(id);
    if (!allRequest) {
      return res.status(200).json({ message: "empty requests list" });
    }
    return res.status(200).json(singleRequest);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

// delet maintenance request

const deleteMaintenace = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenace = await maintenanceModel.findOneAndDelete(id);
    if (!maintenace) {
      return res.status(200).json({ message: "not request found" });
    }
    return res.status(200).json({ message: "deleted effectively" });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

module.exports = {
  sendMaintenance,
  editMaintenace,
  deleteMaintenace,
  getMaintenance,
  getSingleMaintenance,
};