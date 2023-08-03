const application = require("../models/applicantModel"); // Assuming you have a Payment model defined

// Function to update the payment status for expired payments
async function updateExpiredPayments() {
  const currentDate = new Date();
  try {
    await application.updateMany(
      {
        paymentExpiryDate: { $lte: currentDate },
        paymentStatus: true,
        status: "accepted",
      },
      { $set: { paymentStatus: false } }
    );
    console.log("Expired payments updated successfully.");
  } catch (error) {
    console.error("Error updating expired payments:", error);
  }
}

// Set up a scheduled task to run updateExpiredPayments function daily
// You can use a library like node-cron to handle the scheduling

// Example using node-cron (install it using: npm install node-cron)
const cron = require("node-cron");
//* * * * * represents every minutes
//0 * * * * represents every hour  
cron.schedule("0 * * * *", () => {
  console.log("cron job is running");
  // Run the task at midnight every day (change the cron expression based on your requirement)
  updateExpiredPayments();
});

// Export the updateExpiredPayments function
module.exports = {
  updateExpiredPayments,
};
