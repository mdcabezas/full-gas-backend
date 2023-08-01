const { 
  createPost,
  getAllPosts,
  getByIdPosts,
  updateByIdPosts,
  deleteByIdPosts 
} = require('../models/post.model');

const create = async (req, res) => {
  try {
    const reqBody = req.body;
    const item = await createPost(reqBody);
    res.status(200).json({ code: 201, message: "create", data: item });
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
};

const getAll = async (req, res) => {
  try {
    const item = await getAllPosts();
    res.status(200).json({ code: 200, message: "getAllPosts", data: item });
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getByIdPosts(id);
    res.json({ code: 200, message: "getByIdPosts", data: item });
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;
    const item = await updateByIdPosts(id, reqBody);
    res.json({ code: 200, message: "updateByIdPosts", data: item });
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await deleteByIdPosts(id);
    res.json({ code: 200, message: "deleteByIdPosts", data: item });
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
};

module.exports = { create, getAll, getById, updateById, deleteById };