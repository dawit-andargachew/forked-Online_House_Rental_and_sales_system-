const applicationModel = require("./models/applicantModel");
const homeModel = require("./models/homeModel");
class PaymentControl {
  constructor(applicationId) {
    this.applicationId = applicationId;

    setTimeout(async () => {
      const updatedApp = await applicationModel.findById(this.applicationId);
      if (
        updatedApp.status == "accepted" &&
        updatedApp.paymentStatus == false
      ) {
        updatedApp.status = "completed";
        const home = await homeModel.findByIdAndUpdate(updatedApp.homeId, { isRented: false })
        await updatedApp.save();

      }
      console.log("********************************************** : " + this.applicationId + "******************************************");
      console.log("********************************************** : " + this.applicationId + "******************************************");
      console.log("********************************************** : " + this.applicationId + "******************************************");
    }, 1000 * 60 * 60 * 24); // Delayed execution after 1 minute (60 seconds * 1000 milliseconds)
  }
}

const callMethod = (applicationId) => {

  try {

    const RUN_Class = new PaymentControl(applicationId);
    console.log("--------------------------------------------------------------------------------------------------------------------")
    console.log("--------------------------------------------------------------------------------------------------------------------")
    console.log("--------------------------------------------------------------------------------------------------------------------")
    console.log("--------------------------------------------------------------------------------------------------------------------")
    console.log("--------------------------------------------------------------------------------------------------------------------")
  } catch (error) {

  }
};

module.exports = callMethod;
