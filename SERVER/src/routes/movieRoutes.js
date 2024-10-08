
const exp = require('express');
const movieApp = exp.Router();
const {addMovie,getMovies,searchMovie,updateTicketStatus,deleteMovie} = require('../controllers/movieController');
const verifyToken=require('../Middlewares/verifytoken')


movieApp.post('/addMovie',verifyToken,addMovie);

movieApp.get('/all',getMovies);

movieApp.get('/movies/search/:moviename',verifyToken,searchMovie);

movieApp.post('/update/:movieName',updateTicketStatus)

movieApp.delete('/:moviename/delete/',verifyToken,deleteMovie)


module.exports=movieApp