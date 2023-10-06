const Category = require('../models/Categories');

//READ
async function index(req, res) {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
};


module.exports = {
  index
}
