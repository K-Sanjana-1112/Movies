const mongoose=require('mongoose')

//create Schema

const movieSchema=new mongoose.Schema({
    image:{
        type:String,
    },
    movieName:{
        type:String,
        required:true
    },
    theatreName:{
        type:String
    },
    totalSeats:{
        type:Number,
        required:true
    },
    availableTickets:{
        type:Number,
        minimum:0
        
    },
    price:{
        type:Number

    },
    status:{
        type:String,
        default:'BOOK ASAP'

    }
})
  
const MovieModel=mongoose.model('movie',movieSchema)

module.exports=MovieModel