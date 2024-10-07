
const exp = require('express');
const userApp = exp.Router();
const { createUser, userLogin, resetPwd } = require('../controllers/user.controller');
const {verifyToken} = require('../Middlewares/verifytoken')

// POST route for creating a user
userApp.post('/user', createUser);


userApp.post('/user-login', userLogin);

//userApp.post('/:loginId/forgot', verifyToken, resetPwd)

module.exports = userApp;