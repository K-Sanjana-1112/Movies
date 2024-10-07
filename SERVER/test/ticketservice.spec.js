const sinon = require('sinon');
const { expect } = require('chai');
const ticketDao = require('../src/dao/ticket.dao');
const ticketService = require('../src/service/ticketService');

describe('Ticket Service', () => {
    describe('bookTicket', () => {
        it('should book a ticket successfully if tickets are available', async () => {
            const data = {
                movieName: 'rajarani',
                theatreName: 'PVR',
                numberOfTickets: 3,
                seatNumbers: [1, 2, 3]
            };
            const expectedTicket = {
                _id: '123',
                movieName: 'rajarani',
                theatreName: 'PVR',
                numberOfTickets: 3,
                seatNumbers: [1, 2, 3]
            };
            sinon.stub(ticketDao, 'bookTicket').resolves({
                message: 'Ticket booked Successfully',
                ticket: expectedTicket
            });
            const result = await ticketService.bookTicket(data);
            expect(result.message).to.equal('Ticket booked Successfully');
            expect(result.ticket).to.deep.equal(expectedTicket);
            ticketDao.bookTicket.restore();
        });

        it('should return an error if the movie is not found', async () => {
            const data = {
                movieName: 'rajarani',
                theatreName: 'PVR',
                numberOfTickets: 3,
                seatNumbers: [1, 2, 3]
            };
            sinon.stub(ticketDao, 'bookTicket').resolves({ message: 'Movie notFound' });
            const result = await ticketService.bookTicket(data);
            expect(result.message).to.equal('Movie notFound');
            ticketDao.bookTicket.restore();
        });

        it('should return an error if not enough tickets are available', async () => {
            const data = {
                movieName: 'rajarani',
                theatreName: 'PVR',
                numberOfTickets: 100,
                seatNumbers: [1, 2, 3, 4, 5]
            };
            sinon.stub(ticketDao, 'bookTicket').resolves({ message: 'Only 5 tickets are available' });
            const result = await ticketService.bookTicket(data);
            expect(result.message).to.equal('Only 5 tickets are available');
            ticketDao.bookTicket.restore();
        });
    });
});
