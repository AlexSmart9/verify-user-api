const { getAll, create, getOne, remove, update, login, logged, userVerified, updatePassword, updatePasswordRequest } = require('../controllers/user.controllers');
const express = require('express');
const hash = require('../middlewares/hash.middlewares');
const loginMiddlewares = require('../middlewares/login.middlewares');
const sessionJWT = require('../middlewares/sessionJWT.middlewares');
const { verifyJWT } = require('../utils/verifyJWT');
const emailCode = require('../middlewares/emailCode.middlewares');
const passwordCode = require('../middlewares/passwordCode.middlewares');

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT, getAll)
    .post(hash ,create, emailCode);

userRouter.route('/login')
    .post(loginMiddlewares, sessionJWT, login)

userRouter.route('/me')
    .get(verifyJWT, logged)

userRouter.route('/verify/:code')
    .get(userVerified)

userRouter.route('/reset_password/email')
    .post(updatePasswordRequest, passwordCode)

userRouter.route('/reset_password/:code')
    .put(hash, updatePassword)
    
userRouter.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRouter;