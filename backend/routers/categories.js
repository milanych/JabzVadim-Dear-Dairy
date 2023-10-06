const { Router } = require('express');

const pc = require('../controllers/categories.js');

const postRouter = Router();

postRouter.get("/", pc.index);

module.exports = postRouter;
