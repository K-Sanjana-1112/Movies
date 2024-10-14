const ticketService = require('../service/ticketService')
let Movie = require('../Model/movieModel')

const bookTicket = async (req, res) => {
    try {
        
        let { movieName,theatreName, numberOfTickets, seatNumbers } = req.body;
       
        let data = { movieName, theatreName, numberOfTickets, seatNumbers }
        
        const bookTicket = await ticketService.bookTicket(data);
      
        
        let ticket = bookTicket.ticket
        if(bookTicket.message && bookTicket.message.includes('Only')){
            return res.send(bookTicket)
        }
        res.send({
            message:bookTicket.message ,
            ticket: {
                id: ticket._id,
                movieName: ticket.movieName,
                theatreName: ticket.theatreName,
                numberOfTickets: ticket.numberOfTickets,
                seatNumbers: ticket.seatNumbers
            }
        })
    } catch (error) {
        res.status(500).json({ error: 'Error in booking the ticket' });
    }

};



module.exports = { bookTicket }