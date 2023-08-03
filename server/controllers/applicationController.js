const applicationModel = require("../models/applicantModel");
const tenantModel = require("../models/tenantModel");
const ownerModel = require("../models/ownerModel");
const sendEmail = require("../authController/sendEmial");
const { default: mongoose } = require("mongoose");
const homeModel = require("../models/homeModel");
const smsService = require("../authController/smsService");
const callMethod = require("../Demo");


// get all applications that do have non null visitRequest ?
//how to populate query from mongodb ?
const applicationsWithVisitRequest = async (req, res) => {
  try {
    const applications = await applicationModel
      .find({ visitRequest: { $ne: null }, status: "pending" })
      .populate({ path: "homeId", select: "title woreda subCity" })
      .populate({ path: "applicantId", select: "name phone email lastName" })
      .populate({ path: "ownerId", select: "name phone email lastName" });
    return res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    return res.status(201).send("failed");
  }
};
// send application request
const addApplicationRequest = async (req, res) => {
  try {
    // console.log("befor distracturin", req.body);
    const applicantId = req.body.applicantId;
    const ownerId = req.body.ownerId;
    const applicant = await tenantModel.findById(applicantId);
    const owner = await ownerModel.findById(ownerId);
    console.log("after distracturin", req.body);
    if (!applicant) {
      return res.status(404).json({ message: "applicant file doesn't exist" });
    }
    if (!owner) {
      return res.status(404).json({ message: "owner file doesn't exist" });
    }
    const homeId = req.body.homeId;
    const app = await applicationModel.findOne({
      homeId: homeId,
      applicantId: req.body.applicantId,
    });
    if (app && app.status == "pending") {
      return res
        .status(200)
        .send("application already sent. wait for ownr response");
    }
    // add to database
    const application = await applicationModel.create(req.body);
    // add the applicant and owner document
    owner.applicationId.push(application._id);
    applicant.applicationId.push(application._id);
    await owner.save();
    await applicant.save();
    let to = owner.email;
    let subject = " New home rental application";
    let text = `You have new home rental application , pleas check your portal`;
    await sendEmail(to, subject, text);
    return res.status(201).json({
      message: "application sent!",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "something wnet wrong" });
  }
};
// get all applications in database
const getAllApplictions = async (req, res) => {
  try {
    const applications = await applicationModel
      .find()
      .populate("ownerId")
      .populate("applicantId")
      .populate("homeId")
      .sort({ createdAt: -1 });

    if (!applications) {
      return res.status(404).json({ message: "empty list" });
    }
    return res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error });
  }
};
// get applications that blongs to a tenant
const getTenantApplications = async (req, res) => {
  const { id } = req.params;

  try {
    const applications = await applicationModel
      .find({ applicantId: id })
      .populate("ownerId")
      .populate("applicantId")
      .populate("homeId")
      .sort({ createdAt: -1 });
    if (!applications) {
      return res.status(404).json({ message: "empty list" });
    }
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
// get all applications that belongs to a single home owner
const getOwnerApplications = async (req, res) => {
  const { id } = req.params;

  try {
    const applications = await applicationModel
      .find({ ownerId: id })
      .populate("ownerId")
      .populate("applicantId")
      .populate("homeId")
      .sort({ createdAt: -1 });
    if (!applications) {
      return res.status(404).json({ message: "empty list" });
    }
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
//get all applications that belongs to a single house
const getHouseApplications = async (req, res) => {
  const { id } = req.params;

  try {
    const applications = await applicationModel
      .find({ homeId: id })
      .populate("ownerId")
      .populate("applicantId")
      .populate("homeId")
      .sort({ createdAt: -1 });
    if (!applications) {
      return res.status(404).json({ message: "empty list" });
    }
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
// get one application details
const getSingleApplication = async (req, res) => {
  const { id } = req.params; // Extract the id from req.params

  try {
    const application = await applicationModel
      .findById(id)
      .populate("ownerId")
      .populate("applicantId")
      .populate("homeId");

    if (!application) {
      return res.status(404).json({ message: "Empty list" });
    }

    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete application
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "invalid id " });
    }
    const application = await applicationModel.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Remove the ID of the deleted application from the houseowner and applicant documents
    const { ownerId, applicantId } = application;
    await ownerModel.findByIdAndUpdate(ownerId, {
      $pull: { applicationId: id },
    });
    await tenantModel.findByIdAndUpdate(applicantId, {
      $pull: { applicationId: id },
    });

    await applicationModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Application deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update an appliction
const updateApplication = async (req, res) => {
  const id = req.body.id;

  try {

    if (req.body.status && req.body.status === "accepted") {
      callMethod(id);
    }
  } catch (error) { }

  try {
    const application = await applicationModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // Return the updated document
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (req.body.status && req.body.status == "accepted") {
      const home = await homeModel.findByIdAndUpdate(application.homeId, {
        isRented: true,
      });

      // when accepted make the payment exprey date to know
      try {
        const applicationUpdate = await applicationModel.findByIdAndUpdate(
          application._id,
          { paymentExpiryDate: Date.now() }
        );
      } catch (error) {
        console.log(error);
      }
      try {
        await smsService.sendSMS(
          "+2510977439777",
          "application has been accepted"
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (req.body.status == "completed") {
      const home = await homeModel.findByIdAndUpdate(application.homeId, {
        isRented: false,
      });
      try {
        await smsService.sendSMS("+2510977439777", "rent has been completed");
      } catch (error) {
        console.log(error);
      }
    }

    return res
      .status(200)
      .json({ message: "Application updated", application });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addApplicationRequest,
  getAllApplictions,
  getOwnerApplications,
  getTenantApplications,
  getHouseApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
  applicationsWithVisitRequest,
};
