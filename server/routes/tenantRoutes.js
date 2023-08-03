/**
 * @swagger
 * tags:
 *   name: Tenant
 *   description: APIs for managing Tenant accounts
 *
 * /tenant/login:
 *   post:
 *     tags: [Tenant]
 *     summary: Login an Tenant
 *     description: Login an Tenant using email and password to get an access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the Tenant
 *               password:
 *                 type: string
 *                 description: Password of the Tenant
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token to be used for authentication
 *               example:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 * @swagger
 * /tenant/all:
 *   get:
 *     tags: [Tenant]
 *     summary: Get all Tenants
 *     description: Retrieve a list of all Tenants.
 *     responses:
 *       200:
 *         description: A list of Tenant objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tenant1'
 * /tenant/register:
 *   post:
 *     tags: [Tenant]
 *     summary: Create a new Tenant
 *     description: Create a new Tenant with the given information.
 *     requestBody:
 *       description: Tenant object that needs to be registered
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tenant'
 *     responses:
 *       201:
 *         description: Tenant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tenant'
 * /tenant/updatePassword:
 *   put:
 *     tags: [Tenant]
 *     summary: Update Tenant password
 *     description: Update an Tenant's password with the given information.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Tenant object that needs to be updated with new password.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Current password of the Tenant
 *               newPassword:
 *                 type: string
 *                 description: New password to be set for the Tenant
 *             example:
 *               oldPassword: oldpassword123
 *               newPassword: newpassword456
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid request body or password
 *       401:
 *         description: Unauthorized access, invalid or expired token
 *       500:
 *         description: Internal server error
 * /tenant/reset:
 *   post:
 *     tags: [Tenant]
 *     summary: reset Tenant password using email
 *     description: Sends an email to the specified Tenant user with instructions on resetting their password.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *       description: user email to send token.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *
 *               email:
 *                 type: string
 *                 description: email  for the Tenant
 *             example:
 *               email: oldpassword123@gmail.com
 *
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid request body or email
 *       401:
 *         description: Unauthorized access, invalid or expired token
 *       500:
 *         description: Internal server error
 *
 * /tenant/get{id}:
 *   get:
 *     tags: [Tenant]
 *     summary: Get an Tenant by ID
 *     description: Retrieve an Tenant with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Tenant to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An Tenant object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tenant'
 * /tenant/update:
 *   put:
 *     tags: [Tenant]
 *     summary: Update an Tenant
 *     description: Update an Tenant with the given information.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Tenant to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Tenant object that needs to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tenant'
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tenant'
 * /tenant/delete:
 *
 *   delete:
 *     tags: [Tenant]
 *     summary: Delete an Tenant by ID
 *     description: Delete an Tenant with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Tenant to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tenant deleted successfully
 *       404:
 *         description: Tenant user not found
 *       500:
 *         description: Internal server error
 * /tenant/newPassword:
 *
 *   post:
 *     tags: [Tenant]
 *     summary: reset Tenant password with new password
 *     description: Updates the password of the specified Tenant user with the new password.
 *     requestBody:
 *       description: Tenant object that needs to be updated with new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email registerress of the Tenant user to update password
 *               token:
 *                 type: string
 *                 description: Token received by Tenant user to update password
 *               newPassword:
 *                 type: string
 *                 description: New password to update
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: Tenant user not found
 *       500:
 *         description: Internal server error
 */

const express = require("express");
// const Tenant = require('../models/TenantModel')
const multer = require("multer");
const {
  registerTenant,
  getAllTenants,
  getTenant,
  deleteTenant,
  updateTenant,
  tenantLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword,
  activateAccount,
  getAllBuyers,
} = require("../controllers/tenantController");
const upload = require("../imagesHandler/singleImage");

// calling endpoints
const router = express.Router();
router.get("/all", getAllTenants);
router.get("/profile/:id", getTenant);
router.post("/register", registerTenant);
router.delete("/delete/:id", deleteTenant);
router.put("/update", updateTenant);
router.post("/login", tenantLogin);
router.put("/updatePassword", updatePassword);
router.post("/reset", passwordResetRequest);
router.post("/newPassword", resetPasswordProcess);
router.get("/verify-email/:token", activateAccount);
router.get("/buyers", getAllBuyers);

module.exports = router;
