const router = require('express').Router();
const {
	createTicket,
	getUnresolvedTickets,
	getResolvedTickets,
	resolveTicket,
} = require('../controllers/ticket.controller');
const { verifyToken, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/', verifyToken, createTicket);

// READ
router.get('/unresolved', verifyAdmin, getUnresolvedTickets);
router.get('/resolved', verifyAdmin, getResolvedTickets);

// UPDATE
router.post('/:ticketID/resolve', verifyAdmin, resolveTicket);

module.exports = router;
