//swagger

/**
 * @swagger
 * tags:
 *   name: Application
 *   description: APIs for managing rent application request
 * /application/send:
 *   post:
 *     tags: [Application]
 *     summary: Add a new application request
 *     description: Adds a new application request to the database
 *     requestBody:
 *       description: Application request object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
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
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 */
/**
 * @swagger
 * /application/all:
 *   get:
 *     tags: [Application]
 *     summary: Get all applications in the database
 *     description: Returns a list of all applications in the database
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       404:
 *         description: No applications found in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 */
/**
 * @swagger
 * /application/tenant:
 *   get:
 *     tags: [Application]
 *     summary: Get applications belonging to a tenant
 *     description: Retrieve a list of applications belonging to a tenant by their ID
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the tenant
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       404:
 *         description: No applications found for the specified tenant ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 */
/**
 * @swagger
 * /application/delete:
 *   delete:
 *     summary: Delete an application.
 *     tags: [Application]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the application to delete.
 *     responses:
 *       200:
 *         description: The application was successfully deleted.
 *       404:
 *         description: The specified application was not found.
 *       500:
 *         description: An error occurred while deleting the application.
 */
/**
 * @swagger
 * /application/update:
 *   put:
 *     summary: Update an application
 *     tags:
 *       - Application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the application to update
 *
 *     responses:
 *       '200':
 *         description: Application updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /application/house:
 *   get:
 *     summary: Get all applications that belong to a single house.
 *     tags: [Application]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the house.
 *     responses:
 *       200:
 *         description: A list of applications that belong to the house.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       404:
 *         description: No applications found for the given house ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
/**
 * @swagger
 * /applications/owner:
 *   get:
 *     summary: Get all applications that belong to a single home owner
 *     tags: [Application]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the home owner whose applications to retrieve
 *     responses:
 *       '200':
 *         description: A list of applications belonging to the specified home owner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       '404':
 *         description: No applications found for the specified home owner ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that no applications were found
 */
/**
 * @swagger
 * /application/{id}:
 *   get:
 *     summary: Get details of a single application.
 *     tags: [Application]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the application to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Details of the requested application.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       "404":
 *         description: No application found with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

const {
  addApplicationRequest,
  getAllApplictions,
  getOwnerApplications,
  getTenantApplications,
  getHouseApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
  applicationsWithVisitRequest,
} = require("../controllers/applicationController");

const express = require("express");
const router = express.Router();
router.get("/byOwner/:id", getOwnerApplications);
router.get("/byTenant/:id", getTenantApplications);
router.get("/byHouse/:id", getHouseApplications);
router.get("/single/:id", getSingleApplication);
router.post("/send", addApplicationRequest);
router.get("/all", getAllApplictions);
router.delete("/delete/:id", deleteApplication);
router.put("/update", updateApplication);
router.get("/visit", applicationsWithVisitRequest);

module.exports = router;
