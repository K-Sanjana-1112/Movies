const adminDao = require('../dao/adminDao');

const createAdmin = async (data) => {
    const newAdmin = await adminDao.createAdmin(data);
    return newAdmin;
  };


  const adminLogin = async (email,password) => {
    const newAdmin = await adminDao.adminLogin(email,password);
    return newAdmin;
  };

  module.exports={createAdmin,adminLogin}