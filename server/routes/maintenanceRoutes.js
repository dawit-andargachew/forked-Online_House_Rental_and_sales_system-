//swagger  documentaion
/**
 * @swagger
 * tags:
 *   name: Maintenance
 *   description: API endpoints for Maintenance Requests
 */
/**
 * @swagger
 * /maintenance/send:
 *   post:
 *     tags: [Maintenance]
 *     summary: Send a maintenance request
 *     description: Creates a new maintenance request object and adds it to the database
 *     requestBody:
 *       description: Maintenance object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       201:
 *         description: Request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the operation
 *       400:
 *         description: Unable to send request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure

 * /maintenance/edit:
 *   put:
 *     tags: [Maintenance]
 *     summary: Edit a maintenance request
 *     description: Edits an existing maintenance request object with new information
 *     requestBody:
 *       description: Maintenance object that needs to be edited
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       201:
 *         description: Request edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the operation
 *       404:
 *         description: Unable to edit request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 * /maintenance/all:
 *   get:
 *     tags: [Maintenance]
 *     summary: Get all maintenance requests
 *     description: Retrieves a list of all existing maintenance requests
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Maintenance'
 *       404:
 *         description: No maintenance requests found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 * /maintenance/single{id}:
 *   get:
 *     tags: [Maintenance]
 *     summary: Get a single maintenance request
 *     description: Retrieves a single existing maintenance request by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the maintenance request to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       404:
 *         description: Maintenance request not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 * /maintenance/delete:
 *   delete:
 *     tags: [Maintenance]
 *     summary: Delete a maintenance request
 *     description: Deletes an existing maintenance request by its ID
 *     requestBody:
 *       description: ID of the maintenance request to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the maintenance request to delete
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the operation
 *       404:
 *         description: Maintenance request not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure



 */

// import the controller functions
const {
  sendMaintenance,
  editMaintenace,
  deleteMaintenance,
  getMaintenance,
  getSingleMaintenance,
  getByHouseOwner,
  getByTenant,
} = require("../controllers/maintenanceController");

const express = require("express");
const router = express.Router();

router.post("/send", sendMaintenance);
router.put("/edit", editMaintenace);
router.delete("/delete/:id", deleteMaintenance);
router.get("/single/:id", getSingleMaintenance);
router.get("/all", getMaintenance);
router.get("/houseowner/:id", getByHouseOwner);
router.get("/tenant/:id", getByTenant);

module.exports = router;
