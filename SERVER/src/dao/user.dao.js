const UserModel = require('../Model/userModel');
const Admin = require('../Model/adminModel')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
require('dotenv').config()

// create User-register
const createUser = async (data) => {
  try {
    let user = data;
    if (data.password !== data.confirmPwd) {
      return ({ message: "Passwords do not match" })
    }
    let hashedPwd = await bcryptjs.hash(user.password, 5);
   
    let newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      loginId: user.loginId,
      password: hashedPwd,
      contactNum: user.contactNum,
     
    }
    UserModel.create(newUser);
    return ({ message: "User Created Successfully", newUser })

  } catch (error) {
    return ({ error: 'Error During Register' })

  }
};



// user-login
const loginUser = async (email, password) => {
  try {

    let mail = email
    let pwd = password
    // check email or login Id
    
      let userfromdb = await UserModel.findOne({ email: mail })
      if (userfromdb === null) {
        return ({ message: "Invalid Email or Password" })
      }
      // check password
      let result = await bcryptjs.compare(pwd, userfromdb.password)
      if (result === false) {
        return ({ message: "Invalid Password" })
      } else {
        let signedPwd = jwt.sign({ email: userfromdb.email}, process.env.SECRET_KEY, { expiresIn: '1h' })
        return ({ message: "Login Success", token: signedPwd, userfromdb })
      }

    

  } catch (error) {
    return ({ error: 'Error During Login' })

  }

}

const resetPwd = async (loginId, password, confirmPwd) => {
  if (password !== confirmPwd) {
    return ({ message: "Passwords do not match" })
  }
  let hashedPwd = await bcryptjs.hash(password, 5);
  let user = await UserModel.findOneAndUpdate({ loginId: loginId }, { password: hashedPwd }, { new: true })
  if (user === null) {
    return ({ message: "No user found with the given Email address " })
  } else {
    return ({ message: "Password Updated Successfully", user })
  };
}




module.exports = {
  createUser,
  loginUser,
  resetPwd,
 
};