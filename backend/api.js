const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const postRouter = require('./routers/post');
const userRouter = require('./routers/user');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logger);

api.get("/", (req, res) => {
  res.json({
    name: "Dear Diary...",
    description: "Do you love the sound of your own voice? Do you feel that you have something to share that you don't want anyone else to see?"
  })
})

api.use("/posts", postRouter);
api.use("/users", userRouter);

module.exports = api;
