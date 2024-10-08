const UserModel = require('../Model/userModel');
const Admin = require('../Model/adminModel')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
require('dotenv').config()



const createAdmin = async (data) => {
    try {
      let admin = data;
      if (data.password !== data.confirmPwd) {
        return ({ message: "Passwords do not match" })
      }
      let hashedPwd = await bcryptjs.hash(admin.password, 5);
      
        let newAdmin = {
          lastName:admin.lastName,
          email: admin.email,
          password: hashedPwd,
        
        }
        Admin.create(newAdmin)
        return ({ message: "Admin Created Successfully", newAdmin })
  
    } catch (error) {
      return ({ error: 'Error During Register' })
  
    }
  };
 

  const adminLogin= async(email,password)=>{
    let mail = email
    let pwd = password
    let admin = await Admin.findOne({ email: mail })
      let result = await bcryptjs.compare(pwd, admin.password)
      if (result === false) {
        return ({ message: "Invalid Password" })
      } else {
       
        let signedPwd=jwt.sign({email:admin.email},process.env.SECRET_KEY,{expiresIn:'1h'})      
        return ({ message: "Login Success", token: signedPwd, admin })
      }

  }
  module.exports={createAdmin,adminLogin}
