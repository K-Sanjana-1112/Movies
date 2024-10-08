const movieService = require('../service/movieService');
const Movie=require('../Model/movieModel')

const addMovie = async (req, res) => {
    try {
        let {image,movieName,theatreName,totalSeats,price,status}= req.body;
        let data={
            image:image,
            movieName:movieName,
            theatreName:theatreName,
            totalSeats:totalSeats,
            availableTickets:totalSeats,
            price:price,
            status:status
        }
        
        
        // if (!movieName || !theatreName) {
        //     return res.status(400).send({ error: 'All fields are required!' });
        // }
        const addMovie = await movieService.addMovie(data);
        res.status(200).send({
            message: addMovie.message, addMovie:addMovie.newMovie
        });
    } catch (error) {
        res.status(500).json({ error: 'Error adding movie' });
    }
};

const getMovies=async(req,res)=>{
    try{
        const getMovies = await movieService.getMovies();
        res.status(200).send({
            message: getMovies.message, getMovies
        });

    } catch (error) {
        res.status(500).json({ error: 'Error getting movies' });
    }
}

const searchMovie=async(req,res)=>{

    try{
        let name=req.params.moviename
        const searchMovie = await movieService.searchMovie(name);
        res.status(200).send({
            message: searchMovie.message, searchMovie
        });

    } catch (error) {
        res.status(500).json({ error: 'Error searching for movie' });
    }

}

const updateTicketStatus = async (req, res) => {
    console.log(req.body,'req'
    )
    let tickets=parseInt(req.body.tickets)
    let movieName = req.params.movieName
    
    let data={movieName,tickets}
    let updateStatus = await movieService.updateTicketStatus(data);
    res.send({ message:updateStatus.message,updateStatus})
}

const deleteMovie=async(req,res)=>{
    let moviename=req.params.moviename
    let data={moviename}
    let deleteMovie=await movieService.deleteMovie(data)
    res.send({message:deleteMovie.message})


}

module.exports = {
    addMovie,
    getMovies,
    searchMovie,
    updateTicketStatus,
    deleteMovie
}