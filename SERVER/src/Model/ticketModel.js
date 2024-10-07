const mongoose=require('mongoose')

//create Schema

const ticketSchema=new mongoose.Schema({
    movieName:{
        type:String
     },
    theatreName:{
       type:String
    },
    numberOfTickets:{
        type:Number,
        required:true
    },
    seatNumbers:{
        type:String,
        required:true
    }


})
  
const TicketModel=mongoose.model('ticket',ticketSchema)

module.exports=TicketModel;