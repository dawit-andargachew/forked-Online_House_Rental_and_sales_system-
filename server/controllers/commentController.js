const getUser = require("../authController/authorize");
const commentModel = require("../models/commentModel");

const mongoose = require("mongoose");
const getByOwner = async (req, res) => {
  const { id } = req.params;
  const comments = await commentModel
    .find({ ownerId: id })
    .populate({ path: "reviewerId", select: "name _id lastName image" });
  if (!comments) {
    return res
      .status(200)
      .json({ message: "no comments found for this owner" });
  }
  return res.status(201).json(comments);
};
const getByHouse = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const comments = await commentModel
    .find({ houseId: id })
    .populate({ path: "reviewerId", select: "name _id lastName image" });
  if (!comments) {
    return res
      .status(200)
      .json({ message: "no comments found for this house" });
  }
  return res.status(200).json(comments);
};

const addComment = async (req, res) => {
  try {
    const comment = await commentModel.create(req.body);
    const newComment = await commentModel
      .findById(comment._id)
      .populate({ path: "reviewerId", select: "name _id lastName image" });
    return res.status(200).json({ message: "comment added", newComment });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const editComment = async (req, res) => {
  const id = req.body.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  try {
    const comment = await commentModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!comment) {
      return res.status(401).json({ message: "no comment found" });
    }
    return res.status(200).json({ message: "comment edited !", comment });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await commentModel.findByIdAndDelete(id);
    if (!comment) {
      return res.status(401).json({ message: "no comment found" });
    }
    return res.status(200).json({ message: "comment deleted!" });
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

const getAllComments = async (req, res) => {
  console.log("get all comments");
  const comments = await commentModel
    .find()
    .populate({ path: "reviewerId", select: "name _id lastName image" });
  if (!comments) {
    return res.status(401).send("no comment s found");
  }
  return res.status(201).json(comments);
};

module.exports = {
  getByHouse,
  getByOwner,
  deleteComment,
  editComment,
  addComment,
  getAllComments,
};
