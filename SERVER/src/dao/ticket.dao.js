const Ticket = require('../Model/ticketModel')
const Movie = require('../Model/movieModel')
const mongoose = require('mongoose')

const bookTicket = async (data) => {
    
   
    let movie = await Movie.findOne({ movieName: data.movieName, theatreName: data.theatreName })
    if (!movie) {
        return ({ message: "Movie notFound" })
    }
    if(movie.availableTickets< data.numberOfTickets){
        return ({message:`Only ${movie.availableTickets} tickets are available`  })
    }
    movie.availableTickets-=data.numberOfTickets
    if (movie.availableTickets <= 0) {
        movie.status = 'SOLD OUT';
    } else {
        movie.status = 'BOOK ASAP';
    }
    await movie.save()
    
    let newticket = {
        movieName: movie.movieName,
        theatreName: data.theatreName,
        numberOfTickets: data.numberOfTickets,
        seatNumbers: data.seatNumbers
    }
    console.log(newticket)
        let ticket = await Ticket.create(newticket)
        return ({ message: "ticket booked Successfully", ticket })


    
    
    
    

}




module.exports = {
    bookTicket
}