const userService = require('../service/user.services');
const Admin=require('../Model/adminModel')

const createUser = async (req, res) => {
  try {
    let data=req.body;
    
      if (!data.firstName || !data.lastName || !data.email || !data.loginId || !data.password   || !data.confirmPwd || !data.contactNum) {
        return res.status(400).send({ error: 'All fields are required!' });
      }
      
      const newUser = await userService.createUser(data);
      res.status(200).send({
      message: newUser.message, newUser});

    
    
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};




const userLogin = async(req,res)=>{
  try{
  const {email,password}=req.body
   const newUser=await userService.userLogin(email,password);
   res.status(200).send({message:newUser.message,newUser});
  }catch (error) {
    res.status(500).send({ error: 'Error logging user'});
  }
};


const resetPwd = async(req,res)=>{
  try{
  const loginId=req.params.loginId
  const {password,confirmPwd}=req.body
   const newUser=await userService.resetPwd(loginId,password,confirmPwd);
   res.status(200).send({message:newUser.message,newUser});
  }catch (error) {
    res.status(500).send({ error: 'Error creating user'});
  }
};
  
              





const getAllUsers=async(req,res)=>{
  try{
    const users = await userService.getAllUsers();
    res.status(200).send(users)
  }
  catch(error){
    res.status(500).json({error:'Error fetching users'})
  }
}

module.exports = {
  getAllUsers,
  createUser,
  userLogin,
  resetPwd,
  
};