//swagger documentaion
/**
 * @swagger
 * tags:
 *   name: Rent
 *   description: APIs for managing rental information
 *
 * /rent/delete:
 *   delete:
 *     tags: [Rent]
 *     summary: Delete rent information
 *     description: Deletes the rent information.
 *     responses:
 *       201:
 *         description: Rent information deleted successfully.
 *       400:
 *         description: No rent information found.
 *       404:
 *         description: Rent information not found.
 */
/**
 * @swagger
 * /rent/getById{id}:
 *   get:
 *     tags: [Rent]
 *     summary: Get rent information by ID
 *     description: Retrieve rent information by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the rent information to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rent information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 *       400:
 *         description: Empty list
 *       404:
 *         description: Rent information not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /rent/all:
 *   get:
 *     tags:
 *       - Rent
 *     summary: Get all rent information
 *     description: Returns all rent information stored in the database.
 *     responses:
 *       200:
 *         description: Returns an array of rent information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 *       400:
 *         description: No rent information found
 *       404:
 *         description: Error occurred while retrieving rent information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @swagger
 * /rent/add:
 *   post:
 *     tags:
 *       -  Rent
 *
 *     summary: Add a new rent information
 *     description: Adds a new rent information to the database and updates the corresponding tenant and owner records with the new rent id.
 *     requestBody:
 *       description: Rent object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       201:
 *         description: Rent information added successfully
 *       404:
 *         description: Failed to add rent information
 */
/**
 * @swagger
 * /rent/getByTenant:
 *   get:
 *     tags:
 *       -  Rent
 *
 *     summary: retrive rent information
 *     description: get rent information from the database given the id of the tenant.
 *     requestBody:
 *       description: id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       201:
 *         description: Rent information added successfully
 *       404:
 *         description: Failed to add rent information
 */
/**
 * @swagger
 * /rent/getByOwner:
 *   get:
 *     tags:
 *       -  Rent
 *
 *     summary: retrive rent information
 *     description: get rent information from the database given the id of the owner.
 *     requestBody:
 *       description: id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       201:
 *         description: Rent information retrived
 *       404:
 *         description: Failed to get rent information
 */
/**
 * @swagger
 * /rent/getByHome:
 *   get:
 *     tags:
 *       -  Rent
 *
 *     summary: retrive rent information
 *     description: get rent information from the database given the id of the home.
 *     requestBody:
 *       description: id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       201:
 *         description: Rent information rtrived successfully
 *       404:
 *         description: Failed to get rent information
 */

//import all controller functions
const {
  addRentInformation,
  deleteRentInformation,
  getRentInformationByID,
  getAllRent,
  updateRent,
  getRentInformationByHome,
  getRentInformationByTenant,
  getRentInformationByOwner,
} = require("../controllers/rentController");

const express = require("express");
const router = express.Router();

//define the routes
router.get("/single/:id", getRentInformationByID);
router.get("/all", getAllRent);
router.post("/accept", addRentInformation);//when appliction is accepted by home owner
router.delete("/delete/:id", deleteRentInformation);
router.put("/update", updateRent);
router.get("/getByOwner/:id", getRentInformationByOwner);
router.get("/getByHome/:id", getRentInformationByHome);
router.get("/getByTenant/:id", getRentInformationByTenant);

module.exports = router;
