require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const checkPayment = require("./controllers/checkPayment");

//import routes one by one
const paymentRouter = require("./routes/paymentRoute");
const adminRouts = require("./routes/adminRoutes");
const ownerRouts = require("./routes/ownerRoutes");
const commentRoutes = require("./routes/commentRoutes");
const houseRoutes = require("./routes/houseRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const rentRoutes = require("./routes/rentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const swaggerOptions = require("./swaggerOptions");
const bodyParser = require("body-parser");
const {
  getTenantApplications,
} = require("./controllers/applicationController");

//express app
const app = express();
app.use(express.json()); // midleware
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method, req.file, req.body);
  next();
});

const swaggerDocs = swaggerJSDoc(swaggerOptions);
//swagger midlware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//use routs
app.use("/payment", paymentRouter);
app.use("/admin", adminRouts);
app.use("/owner", ownerRouts);
app.use("/comment", commentRoutes);

app.use("/houses", houseRoutes);
app.use("/tenant", tenantRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/rent", rentRoutes);
app.use("/application", applicationRoutes);

// triger check payment

checkPayment.updateExpiredPayments();

// conslo swagger
// console.log(JSON.stringify(swaggerDocument, null, 2));

// conect to db
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    //listen for requests

    app.listen(4000, () => {
      console.log("listening to port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
