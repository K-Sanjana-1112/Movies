const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Ticket = require('../src/Model/ticketModel');
const Movie = require('../src/Model/movieModel');
const ticketdao = require('../src/dao/ticket.dao'); // Adjust the path as necessary

describe('Ticket DAO', function () {
    beforeEach(function () {
        sinon.restore();
    });

    describe('ticketBooking', function () {
        it('should book a ticket successfully if tickets are available', async function () {
            const movieData = { movieName: 'rajarani', theatreName: 'PVR', availableTickets: 100,save:sinon.stub().resolves() };
            const ticketData = { movieName: 'rajarani', theatreName: 'PVR', numberOfTickets: 5, seatNumbers: [1, 2, 3, 4, 5] };
            sinon.stub(Movie, 'findOne').resolves(movieData);
            sinon.stub(Ticket, 'create').resolves(ticketData);
            const result = await ticketdao.bookTicket(ticketData);
            expect(result.message).to.equal('ticket booked Successfully');
        });

        it('should return movie not found if the movie does not exist', async function () {
            sinon.stub(Movie, 'findOne').resolves(null);
            const result = await ticketdao.bookTicket({ movieName: 'Nonexistent', theatreName: 'PVR', numberOfTickets: 5 });
            expect(result.message).to.equal('Movie notFound');
        });

        it('should return available tickets if not enough tickets are available', async function () {
            const movieData = { movieName: 'rajarani', theatreName: 'PVR', availableTickets: 3 };
            sinon.stub(Movie, 'findOne').resolves(movieData);
            const result = await ticketdao.bookTicket({ movieName: 'rajarani', theatreName: 'PVR', numberOfTickets: 5 });
            expect(result.message).to.equal('Only 3 tickets are available');
        });
    });
});
