
const exp = require('express');
const ticketApp = exp.Router();
const { bookTicket, updateTicketStatus } = require('../controllers/ticketController');
const verifyToken=require('../Middlewares/verifytoken')
// POST route for creating a ticket
ticketApp.post('/bookTicket',bookTicket);



module.exports = ticketApp