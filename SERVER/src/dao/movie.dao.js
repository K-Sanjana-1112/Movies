const Movie = require('../Model/movieModel');
const Ticket=require('../Model/ticketModel')
const kafka = require('kafka-node');
// Creating a client and producer
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new kafka.Producer(client);

const addMovie = async (data) => {
    let newMovie=Movie.create(data)
    return ({message:"Movie Added Successfully",payload:newMovie})
        
}


const getMovies = async () => {
    try {
     let movies=await Movie.find()
     return ({message:"All movies",movies})
    } catch (error) {
        res.status(500).json({ error: 'Error getting movies' });
    }
}

const searchMovie = async (name) => {
    try {
     let movies=await Movie.find({movieName: new RegExp(name,'i')})
     return ({message:"All movies",movies})
    } catch (error) {
        res.status(500).json({ error: 'Error searching movies' });
    }
}

const updateTicketStatus = async (data) => {
    
    try {
        console.log(data)
        let movie = await Movie.findOne({ movieName:data.movieName})
        if (!movie) {
            return ({ error: 'Movie not found' });
        }
        let ticket= parseInt(data.tickets)
        let status= movie.availableTickets-=ticket
        console.log(status)
        if (status<=0) {
            movie.status = 'SOLD OUT';
        } else {
            movie.status = 'BOOK ASAP';
        }
        let updatedMovie= await movie.save();
        return ({message:`${movie.status}`, updatedMovie})
    } catch (error) { 
        return ({ error: 'Error in updating ticket status' });

    }
}

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
    console.error('Error in Kafka producer:', err);
});

const deleteMovie = async (data) => {
    console.log(data)
    try {
	        let movie=await Movie.findOneAndDelete({movieName:data.moviename})

     
        if (!movie) {
            return ({ message: 'Movie not found' });
        }
        // Produce a Kafka message about the deletion
        const payloads = [
            {
                topic: 'deletiontopic',
                messages: JSON.stringify({ movieName: movie.movieName, theatreName: movie.theatreName}),
                partition: 0
            }
        ];
        producer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending message to Kafka:', err);
                return res.status(500).json({ message: 'Error deleting movie' ,err});
            }
            console.log('Message sent to Kafka:', data);
        });
        // return success response
        return ({ message: 'Movie deleted successfully', movie });
    } catch (error) {
        console.error('Error deleting movie:', error);
        return ({ message: 'Internal server error' });
    }

};


module.exports = {
    addMovie,
    getMovies,
    searchMovie,
    updateTicketStatus,
    deleteMovie
}