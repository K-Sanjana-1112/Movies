const sinon = require('sinon');
const { expect } = require('chai');
const ticketService = require('../src/service/ticketService');
const ticketController = require('../src/controllers/ticketController');

describe('Ticket Controller', () => {
    describe('bookTicket', () => {
        it('should book a ticket successfully', async () => {
            const req = {
                params: { moviename: 'rajarani' },
                body: { theatreName: 'PVR', numberOfTickets: 5, seatNumbers: [1, 2, 3, 4, 5] }
            };
            const res = {
                send: sinon.stub(),
            };
            sinon.stub(ticketService, 'bookTicket').resolves({
                message: 'Ticket booked successfully',
                ticket: { _id: '1', movieName: 'rajarani', theatreName: 'PVR', numberOfTickets: 5, seatNumbers: [1, 2, 3, 4, 5] }
            });
            const result=await ticketController.bookTicket(req, res);
            ticketService.bookTicket.restore();
        });
        it('should handle errors during ticket booking', async () => {
            const req = { params: { moviename: 'rajarani' }, body: {} };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };
            sinon.stub(ticketService, 'bookTicket').throws(new Error('Error in booking the ticket'));
            const result = await ticketController.bookTicket(req, res);
            expect(res.status.calledWith(500)).to.be.true;
            ticketService.bookTicket.restore();
        });
    });
});