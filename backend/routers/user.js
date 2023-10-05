const { Router } = require('express');

const us = require('../controllers/user.js');

const userRouter = Router();

userRouter.post("/register", us.register);
userRouter.post("/login", us.login);

module.exports = userRouter;
