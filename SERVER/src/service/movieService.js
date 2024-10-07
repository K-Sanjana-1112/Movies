const movieDao = require('../dao/movie.dao');

const addMovie = async (data) => {
    const addMovie = await movieDao.addMovie(data);
    return addMovie;
};

const getMovies = async () => {
    let movies = await movieDao.getMovies();
    return movies;
}
const searchMovie = async (name) => {
    let movie = await movieDao.searchMovie(name);
    return movie
}

const updateTicketStatus=async(data)=>{
    let updateStatus=await movieDao.updateTicketStatus(data);
    return updateStatus
}

const deleteMovie=async(data)=>{
    let deleteMovie=await movieDao.deleteMovie(data);
    return deleteMovie
}

module.exports = {
    addMovie,
    getMovies,
    searchMovie,
    updateTicketStatus,
    deleteMovie
}