const adminService = require('../service/adminService');
const Admin=require('../Model/adminModel')


const createAdmin = async (req, res) => {
    try {
      let data=req.body;
    
      
      if ( !data.lastName || !data.email  || !data.password   || !data.confirmPwd ) {
        return res.status(400).send({ error: 'All fields are required!' });
      }
        const newAdmin = await adminService.createAdmin(data);
        res.status(200).send({
        message: newAdmin.message, newAdmin});  
      
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  };


  const adminLogin = async(req,res)=>{
    try{
    const {email,password}=req.body
     const newAdmin=await adminService.adminLogin(email,password);
     res.status(200).send({message:newAdmin.message,newAdmin});
    }catch (error) {
      res.status(500).send({ error: 'Error logging admin'});
    }
  };
  module.exports={createAdmin,adminLogin}
