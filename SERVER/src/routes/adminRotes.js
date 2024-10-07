const exp=require('express')

const adminApp=exp.Router()

const {createAdmin,adminLogin}=require('../controllers/adminControllers')

const expressAsyncHandler=require('express-async-handler')

// create User
adminApp.post('/admin', createAdmin);

// login admin

adminApp.post('/admin-login',adminLogin)

module.exports=adminApp








module.exports=adminApp