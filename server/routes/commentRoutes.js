/**
 * @swagger
 *  tags:
 *   name: Comment
 *   description: APIs for managing comments
 * /comment/getByOwner:
 *   get:
 *     tags: [Comment]
 *     summary: Get all comments by owner ID
 *     description: Retrieves all comments made by a particular owner using their ID
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: false
 *         schema:
 *           type: string
 *       - in: body
 *         name: id
 *         description: The ID of the owner whose comments are to be retrieved
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 609871a31b631f2780b8d514
 *     responses:
 *       200:
 *         description: An array of comments made by the specified owner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       401:
 *         description: No comments found for this owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no comments found for this owner
 */

/**
 * @swagger
 * /comment/getByHouse:
 *   get:
 *     tags: [Comment]
 *     summary: Get all comments by house ID
 *     description: Retrieves all comments made on a particular house using its ID
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: false
 *         schema:
 *           type: string
 *       - in: body
 *         name: id
 *         description: The ID of the house whose comments are to be retrieved
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 609871a31b631f2780b8d514
 *     responses:
 *       200:
 *         description: An array of comments made on the specified house
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       401:
 *         description: No comments found for this house
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no comments found for this house
 */

/**
 * @swagger
 * /comment/add:
 *   post:
 *     tags: [Comment]
 *     summary: Add a new comment
 *     description: Add a new comment to the database
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Comment object to add
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text content of the comment
 *               ownerId:
 *                 type: string
 *                 description: The ID of the owner associated with the comment
 *               houseId:
 *                 type: string
 *                 description: The ID of the house associated with the comment
 *             example:
 *               text: "This is a comment."
 *               ownerId: "12345"
 *               houseId: "67890"
 *     responses:
 *       '200':
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: "Comment added"
 *       '400':
 *         description: Bad request. The request body may be missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message
 *                   example: "Bad request"
 */

/**
 * @swagger
 * /comment/edit:
 *   put:
 *     tags: [Comment]
 *     summary: Edit an existing comment
 *     description: Edit an existing comment in the database
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Comment object to edit
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the comment to edit
 *               text:
 *                 type: string
 *                 description: The updated text content of the comment
 *             example:
 *               id: "12345"
 *               text: "This is an updated comment."
 *     responses:
 *       '200':
 *         description: Comment edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: "Comment edited"
 *       '400':
 *         description: Bad request. The request body may be missing required fields or contain an invalid ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message
 *                   example: "Invalid ID"
 *       '401':
 *         description: Unauthorized. The user does not have permission to edit this comment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description:
 */
/**
 * @swagger
 * /comment/delete:
 *   delete:
 *     tags: [Comment]
 *     summary: Delete a comment by ID
 *     description: Deletes a comment with the specified ID from the database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token obtained after logging in.
 *         required: false
 *         schema:
 *           type: string
 *       - in: body
 *         name: comment
 *         description: The ID of the comment to be deleted.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the comment to be deleted.
 *           example:
 *             id: 612ef6c246a6aa00152d73b1
 *     responses:
 *       '200':
 *         description: Comment deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the comment was deleted.
 *                   example: Comment deleted!
 *       '401':
 *         description: No comment found with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating that no comment was found with the specified ID.
 *                   example: No comment found with the specified ID.
 *       '500':
 *         description: Internal server error occurred while trying to delete the comment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating that an internal server error occurred while trying to delete the comment.
 *                   example: Internal server error occurred while trying to delete the comment.
 */

// routes

const express = require("express");
const router = express.Router();
const {
  getByHouse,
  getByOwner,
  deleteComment,
  editComment,
  addComment,
  getAllComments,
} = require("../controllers/commentController");

router.post("/add", addComment);
router.get("/getByhouse/:id", getByHouse);
router.get("/getByowner/:id", getByOwner);
router.delete("/delete/:id", deleteComment);
router.put("/edit", editComment);
router.get("/all", getAllComments);

module.exports = router;
