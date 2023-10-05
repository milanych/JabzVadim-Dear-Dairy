const { Router } = require('express');

const pc = require('../controllers/post.js');

const postRouter = Router();

postRouter.get("/", pc.index);
postRouter.post("/", pc.create);
postRouter.get("/:id", pc.show);
postRouter.patch("/:id", pc.update);
postRouter.delete("/:id", pc.destroy);

module.exports = postRouter;
