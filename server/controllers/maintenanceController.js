const maintenanceModel = require("../models/maintenanceModel");
const ownerModel = require("../models/ownerModel");
const tenantModel = require("../models/tenantModel");

//send request

const sendMaintenance = async (req, res) => {
  console.log(req.body);

  try {
    const maintenance = await maintenanceModel.create(req.body);

    if (!maintenance) {
      return res.status(400).json({ message: "unable to send request" });
    }

    const owner = await ownerModel.findById(maintenance.ownerId);
    const applicant = await tenantModel.findById(maintenance.tenantId);
    console.log(applicant);
    owner.requestId.push(maintenance._id);
    applicant.applicationId.push(maintenance._id);
    await owner.save();
    await applicant.save();
    return res.status(201).json({ message: "request sent!" });
  } catch (error) {
    console.error(error); // Log the error message to the console
    return res.status(400).json({ message: "An error occurred" });
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
    const { id } = req.params;
    const singleRequest = await maintenanceModel.findOne({ _id: id });
    if (!singleRequest) {
      return res.status(200).json({ message: "Empty requests list" });
    }
    return res.status(200).json(singleRequest);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error });
  }
};

// delet maintenance request

const deleteMaintenance = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;

    // Find and delete the maintenance request
    const maintenance = await maintenanceModel.findOneAndDelete({ _id: id });
    if (!maintenance) {
      return res.status(404).json({ message: "No request found" });
    }

    // Remove the request ID from the ownerModel
    const owner = await ownerModel.findById(maintenance.ownerId);
    owner.applicationId.pull(maintenance._id);
    await owner.save();

    // Remove the request ID from the tenantModel
    const tenant = await tenantModel.findById(maintenance.tenantId);
    tenant.applicationId.pull(maintenance._id);
    await tenant.save();

    return res.status(200).json({ message: "Deleted effectively" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
// get mentanace by tenant
const getByTenant = async (req, res) => {
  const { id } = req.params;
  const requests = await maintenanceModel
    .find({ tenantId: id })
    .populate("ownerId", "name lastName");
  if (requests) {
    return res.status(201).send({
      status: "success",
      requests,
    });
  }

  return res.status(201).send("failed");
};
//get mentanance by owner

const getByHouseOwner = async (req, res) => {
  const { id } = req.params;
  const requests = await maintenanceModel
    .find({ ownerId: id })
    .populate("tenantId", "name lastName");
  if (requests) {
    return res.status(201).send({
      status: "success",
      requests,
    });
  }

  return res.status(201).send("failed");
};

module.exports = {
  sendMaintenance,
  editMaintenace,
  deleteMaintenance,
  getMaintenance,
  getSingleMaintenance,
  getByHouseOwner,
  getByTenant,
};
