/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: APIs for managing admin accounts
 *
 * /admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: Login an admin
 *     description: Login an admin using email and password to get an access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the admin
 *               password:
 *                 type: string
 *                 description: Password of the admin
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
 * /admin/all:
 *   get:
 *     tags: [Admin]
 *     summary: Get all admins
 *     description: Retrieve a list of all admins.
 *     responses:
 *       200:
 *         description: A list of admin objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 * /admin/add:
 *   post:
 *     tags: [Admin]
 *     summary: Create a new admin
 *     description: Create a new admin with the given information.
 *     requestBody:
 *       description: Admin object that needs to be added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 * /admin/updatePassword:
 *   put:
 *     tags: [Admin]
 *     summary: Update admin password
 *     description: Update an admin's password with the given information.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Admin object that needs to be updated with new password.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Current password of the admin
 *               newPassword:
 *                 type: string
 *                 description: New password to be set for the admin
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
 * /admin/reset:
 *   post:
 *     tags: [Admin]
 *     summary: reset admin password using email
 *     description: Sends an email to the specified admin user with instructions on resetting their password.
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
 *                 description: email  for the admin
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
 * /admin/profile{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get an admin by ID
 *     description: Retrieve an admin with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the admin to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An admin object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 * /admin/update:
 *   put:
 *     tags: [Admin]
 *     summary: Update an admin
 *     description: Update an admin with the given information.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the admin to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Admin object that needs to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 * /admin/delete:
 *
 *   delete:
 *     tags: [Admin]
 *     summary: Delete an admin by ID
 *     description: Delete an admin with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the admin to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin user not found
 *       500:
 *         description: Internal server error
 * /admin/newPassword:
 *
 *   post:
 *     tags: [Admin]
 *     summary: reset admin password with new password
 *     description: Updates the password of the specified admin user with the new password.
 *     requestBody:
 *       description: Admin object that needs to be updated with new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the admin user to update password
 *               token:
 *                 type: string
 *                 description: Token received by admin user to update password
 *               newPassword:
 *                 type: string
 *                 description: New password to update
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: Admin user not found
 *       500:
 *         description: Internal server error
 */

const express = require("express");

const {
  addAdmin,
  getAllAdmins,
  getAdmin,
  deleteAdmin,
  updateAdmin,
  adminLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword,
} = require("../controllers/adminController");

// calling endpoints
const router = express.Router();
router.get("/all", getAllAdmins);
router.get("/profile/:id", getAdmin);
router.post("/add", addAdmin);
router.delete("/delete/:id", deleteAdmin);
router.put("/update", updateAdmin);
router.post("/login", adminLogin);
router.put("/updatePassword", updatePassword);
router.post("/reset", passwordResetRequest);
router.post("/newPassword", resetPasswordProcess);

module.exports = router;
