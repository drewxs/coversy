const router = require('express').Router();
const {
	createTicket,
	getTicketById,
	getAllTickets,
	setResolved,
} = require('../controllers/ticket.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/site/createticket', verifyUser, createTicket);

// READ
router.get('/site/tickets/:ticketId', verifyAdmin, getTicketById);
router.get('/site/tickets', verifyAdmin, getAllTickets);
router.get('/site/tickets/active', verifyAdmin, getActiveTickets);

// UPDATE
router.post('/site/tickets/:ticketID/resolve', verifyAdmin, setResolved);

module.exports = router;
