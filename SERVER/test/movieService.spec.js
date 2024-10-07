const sinon = require('sinon');
const { expect } = require('chai');
const moviedao = require('../src/dao/movie.dao');
const ticketDao=require('../src/dao/ticket.dao')
const movieService = require('../src//service/movieService');

describe('Movie Service', () => {
    describe('addMovie', () => {
        it('should create a movie successfully', async () => {
            const movieData = { movieName: 'rajarani', theatreName: 'PVR', totalSeats: 100 };
            sinon.stub(moviedao, 'addMovie').resolves({ message: 'Movie created successfully' });
            const result = await movieService.addMovie(movieData);
            expect(result.message).to.equal('Movie created successfully');
            moviedao.addMovie.restore();
        });
    });

    describe('getMovies', () => {
        it('should return all movies', async () => {
            const movies = [{ movieName: 'rajarani' }];
            sinon.stub(moviedao, 'getMovies').resolves(movies);
            const result = await movieService.getMovies();
            expect(result).to.deep.equal(movies);
            moviedao.getMovies.restore();
        });
    });

    // describe('bookTicket', () => {
    //     it('should update the ticket status for a movie', async () => {
    //         const data = { movieName: 'rajarani', tickets: 3 };
    //         sinon.stub(ticketDao, 'bookTicket').resolves({ message: 'Ticket status updated' });
    //         const result = await movieService.updateTicketStatus(data);
    //         expect(result.message).to.equal('SOLD OUT');
    //         moviedao.updateTicketStatus.restore();
    //     });
    // });
});
