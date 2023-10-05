const Post = require('../models/Post');

//READ
async function index(req, res) {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
};

//CREATE
async function create(req, res) {
  try {
    const data = req.body;
    const result = await Post.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ "error": err.message })
  }
};

//READ 2
async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const post = await Post.getOneById(id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
};

//UPDATE
async function update(req, res) {
  try {
    const { id } = req.params;
    const currentPost = await Post.getOneById(id)
    const result = await currentPost.update(req.body, id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

//DELETE
async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const post = await Post.getOneById(id);
    const result = await post.destroy();
    res.status(204).send(result);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
};

module.exports = {
  index, create, show, destroy, update
}
