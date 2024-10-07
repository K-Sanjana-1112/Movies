const ticketDao=require('../dao/ticket.dao')

const bookTicket=async(data)=>{
    const ticket=await ticketDao.bookTicket(data);
    return ticket
};



module.exports={
    bookTicket
}