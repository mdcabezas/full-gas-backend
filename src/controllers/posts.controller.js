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
     res.status(201).json({ code: 201, message: "Publicacion creada con exito", data: item });
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
    const {resultPublicacion, publicacionesActualizadas} = await deleteByIdPosts(id);
    if (publicacionesActualizadas === 0){
     return res.status(409).json({ code: 409, message: "Ops!.Comuniquese con la mesa de ayuda", error: resultPublicacion });
    }
    if(!Array.isArray(resultPublicacion)){
     return res.status(500).json({ code: 500, message: "Ops!.Comuniquese con la mesa de ayuda", error: resultPublicacion });
    }
    res.status(200).json({ code: 200, message: "Registro eliminado exitosamente", data: resultPublicacion });
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
};

module.exports = { create, getAll, getById, updateById, deleteById };