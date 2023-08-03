//swagger defintion
/**
 * @swagger
 *   tags:
 *   name: Houses
 *   description: APIs for managing all houses
 *
 * 
 * /houses/all:
 *   get:
 *     summary: Returns all houses in the database with images.
 *     tags: [Houses]
 *     responses:
 *       200:
 *         description: A list of all houses in the database with images.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/House'
 *       500:
 *         description: An error occurred while trying to retrieve the houses.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 

 * /houses/owner:
 *   get:
 *     summary: Get all houses that belong to a specific owner
 *     tags: [Houses]
 *       
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: The ID of the owner whose houses should be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of houses that belong to the specified owner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/House'
 *       '404':
 *         description: No houses found for ownerId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * 
 * 
 * 
 * /house/{id}:
 *   get:
 *     summary: Get a single house by ID
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the house to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: House object with images
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/House'
 *       404:
 *         description: Invalid ID or House not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message 
 * 
 * /houses/add:
 *   post:     
 *     summary: Add a new house
 *     tags: [Houses]
 *     description: Uploads the images and adds a new house entry to the database.
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: data
 *         description: House data in JSON format 
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/components/schemas/House'
 *       - in: formData
 *         name: images
 *         description: House images to be uploaded.
 *         required: true
 *         type: file
 *         format: binary
 *     responses:
 *       '200':
 *         description: New house has been added successfully.
 *       '400':
 *         description: Error occurred while adding the house. *     
 * 
 * /houses/delete:
 *   delete: 
 *     summary: Delete a house
 *     tags: [Houses]
 *     description: Deletes a house and its associated images from the database and file system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: id
 *         description: ID of the house to delete.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: ID of the house to delete.
 *     responses:
 *       '200':
 *         description: House has been deleted successfully.
 *       '400':
 *         description: Error occurred while deleting the house.
 *       '404':
 *         description: House not found.
 *
 * 
 * /houses/update:
 *   put:
 *     summary: Update a house
 *     tags: [Houses]     
 *     responses:
 *       '200':
 *         description: House updated successfully
 *       '400':
 *         description: Error updating house
 *       '404':
 *         description: House not found 
 *
 * @swagger
 * /houses/deleteImage:
 *   delete:
 *     tags: [Houses]
 *     summary: Delete an image from a house 
 *     parameters:
 *       - name: id
 *         description: ID of the house
 *         in: path
 *         required: true
 *         type: string
 *         format: ObjectId
 *       - name: index
 *         description: Index of the image to delete
 *         in: path
 *         required: true
 *         type: integer
 *         minimum: 0
 *     responses:
 *       '200':
 *         description: Image deleted successfully
 *       '400':
 *         description: Error deleting image
 *       '404':
 *         description: House not found
 */

const express = require("express");
const router = express.Router();
const upload = require("../imagesHandler/multipleImage");
const {
  addHouse,
  getAllHouses,
  getHouse,
  deleteHouse,
  updateHouse,
  deletImage,
  getHousesByOwner,
  getAnalysis,
} = require("../controllers/houseController");

router.post("/add", addHouse);
router.get("/all", getAllHouses);
router.get("/byowner/:id", getHousesByOwner);
router.delete("/delete/:id", deleteHouse);
router.put("/update", updateHouse);
router.delete("/deleteImage", deletImage);
router.get("/single/:id", getHouse);
router.post("/getSimilar", getAnalysis);

module.exports = router;
