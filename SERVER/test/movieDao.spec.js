const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Movie = require('../src/Model/movieModel');
const moviedao = require('../src/dao/movie.dao');

describe('Movie DAO', function () {
    beforeEach(function () {
        sinon.restore();  
    });

    describe('addMovie', function () {
        it('should add a movie successfully', async function () {
            const movieData = { movieName: 'rajarani', availableTickets: 100, status: 'BOOK ASAP' };
            const movieResponse = { message: "Movie added Succesfully", movie: movieData };
            sinon.stub(Movie, 'create').resolves(movieData);
            const result = await moviedao.addMovie(movieData);
            expect(result).to.deep.equal(movieResponse);
        });
    });

    describe('getMovies', function () {
        it('should return all movies', async function () {
            const moviesData = [{ movieName: 'rajarani' }, { movieName: 'Interstellar' }];
            const moviesResponse = { message: "All movies", movies: moviesData };
            sinon.stub(Movie, 'find').resolves(moviesData);
            const result = await moviedao.getMovies();
            expect(result).to.deep.equal(moviesResponse);
        });
    });

    describe('searchMovie', function () {
        it('should search for movies by name', async function () {
            const movieName = 'rajarani';
            const moviesData = [{ movieName: 'rajarani' }];
            const moviesResponse = { message: "All movies", movies: moviesData };
            sinon.stub(Movie, 'find').resolves(moviesData);
            const result = await moviedao.searchMovie(movieName);
            expect(result).to.deep.equal(moviesResponse);
        });
    });

    describe('ticketStatusUpdating', function () {
        it('should update the ticket status for a movie', async function () {
            const movieData = { movieName: 'rajarani', availableTickets: 5, status: 'BOOK ASAP',save:sinon.stub().resolves() };
            sinon.stub(Movie, 'findOne').resolves(movieData);
            const updateData = { moviename: 'rajarani', tickets: 3 };
            const result = await moviedao.updateTicketStatus(updateData);
            expect(result).to.have.property('message').that.is.a('string');
        });
    });

    // describe('deleteMovie', function () {
    //     it('should delete a movie by movieName and theatreName', async function () {
    //         const movieData = { movieName: 'Rayan', theatreName: 'IMAX Theatre' };
    //         const deleteResponse = { message: "Movie deleted Successfully", movie: movieData };
    //         sinon.stub(Movie, 'findByIdAndDelete').resolves(movieData);
    //         const result = await moviedao.deleteMovie('rajarani', 'PVR');
    //         expect(result).to.deep.equal(deleteResponse);
    //     });
    // });
});