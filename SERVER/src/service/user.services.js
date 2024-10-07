const userDao = require('../dao/user.dao');

const createUser = async (data) => {
  const newUser = await userDao.createUser(data);
  return newUser;
};

 
const userLogin = async (email,password) => {
  const newUser = await userDao.loginUser(email,password);
  return newUser;
};

const resetPwd = async (loginId,password,confirmPwd) => {
  const newUser = await userDao.resetPwd(loginId,password,confirmPwd);
  return newUser;
};

module.exports = {
  createUser,
  userLogin,
  resetPwd,
  
};

