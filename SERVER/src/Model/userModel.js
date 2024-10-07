const mongoose=require('mongoose')

//create Schema

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    }, 
    email:{
        type:String,
        unique:true,
        required:[true,'email is required'],
    },
    loginId:{
        type:String,
        unique:true,
        required:[true,'loginId is required'],
    },
    password:{
        type:String,        
        required:[true,'password is required'],
    },
    confirmPwd:{
        type:String,
    },
    contactNum:{
        type:String,
        required:[true,'password is required'],
    }
    


})
  
const UserModel=mongoose.model('user',userSchema)

module.exports=UserModel;