const express = require("express");
const router = express.Router();

const {
  pay,
  deletePayment,
  editPayment,
  getSingle,
  verifyPayment,
} = require("../controllers/paymentController");
const { route } = require("./commentRoutes");

router.post("/pay", pay);
router.post("/verify/:id", verifyPayment);
router.delete("/delete/:id", deletePayment);
router.get("/single/:id", getSingle);

module.exports = router;
