/**
 * @swagger
 * tags:
 *   name: Owner
 *   description: APIs for managing Owner accounts
 *
 * /owner/login:
 *   post:
 *     tags: [Owner]
 *     summary: Login an Owner
 *     description: Login an Owner using email and password to get an access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the Owner
 *               password:
 *                 type: string
 *                 description: Password of the Owner
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
 * /owner/all:
 *   get:
 *     tags: [Owner]
 *     summary: Get all Owners
 *     description: Retrieve a list of all Owners.
 *     responses:
 *       200:
 *         description: A list of Owner objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner1'
 * /owner/register:
 *   post:
 *     tags: [Owner]
 *     summary: Create a new Owner
 *     description: Create a new Owner with the given information.
 *     requestBody:
 *       description: Owner object that needs to be registered
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       201:
 *         description: Owner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 * /owner/updatePassword:
 *   put:
 *     tags: [Owner]
 *     summary: Update Owner password
 *     description: Update an Owner's password with the given information.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Owner object that needs to be updated with new password.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Current password of the Owner
 *               newPassword:
 *                 type: string
 *                 description: New password to be set for the Owner
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
 * /owner/reset:
 *   post:
 *     tags: [Owner]
 *     summary: reset Owner password using email
 *     description: Sends an email to the specified Owner user with instructions on resetting their password.
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
 *                 description: email  for the Owner
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
 * /owner/profile:
 *   get:
 *     tags: [Owner]
 *     summary: Get an Owner by ID
 *     description: Retrieve an Owner with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Owner to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An Owner object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 * /owner/update:
 *   put:
 *     tags: [Owner]
 *     summary: Update an Owner
 *     description: Update an Owner with the given information.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Owner to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Owner object that needs to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Owner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 * /owner/delete:
 *
 *   delete:
 *     tags: [Owner]
 *     summary: Delete an Owner by ID
 *     description: Delete an Owner with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Owner to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Owner deleted successfully
 *       404:
 *         description: Owner user not found
 *       500:
 *         description: Internal server error
 * /owner/newPassword:
 *
 *   post:
 *     tags: [Owner]
 *     summary: reset Owner password with new password
 *     description: Updates the password of the specified Owner user with the new password.
 *     requestBody:
 *       description: Owner object that needs to be updated with new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email registerress of the Owner user to update password
 *               token:
 *                 type: string
 *                 description: Token received by Owner user to update password
 *               newPassword:
 *                 type: string
 *                 description: New password to update
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: Owner user not found
 *       500:
 *         description: Internal server error
 */

const express = require("express");
// const Owner = require('../models/OwnerModel')
const multer = require("multer");
const {
  registerOwner,
  getAllOwners,
  getOwner,
  deleteOwner,
  updateOwner,
  ownerLogin,
  passwordResetRequest,
  resetPasswordProcess,
  updatePassword,
  activateAccount,
} = require("../controllers/ownerController");
const upload = require("../imagesHandler/singleImage");

// calling endpoints
const router = express.Router();
router.get("/all", getAllOwners);
router.get("/profile/:id", getOwner);
router.post("/register", registerOwner);
router.delete("/delete/:id", deleteOwner);
router.put("/update/", updateOwner);
router.post("/login", ownerLogin);
router.put("/updatePassword", updatePassword);
router.post("/reset", passwordResetRequest);
router.post("/newPassword", resetPasswordProcess);
router.get("/verify-email/:token", activateAccount);

module.exports = router;
