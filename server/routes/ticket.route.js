const router = require('express').Router();
const {
	createTicket,
	getUnresolvedTickets,
	getResolvedTickets,
	resolveTicket,
	unresolveTicket,
} = require('../controllers/ticket.controller');
const { verifyToken } = require('../middleware/verify');

// CREATE
router.post('/', verifyToken, createTicket);

// READ
router.get('/unresolved', verifyToken, getUnresolvedTickets);
router.get('/resolved', verifyToken, getResolvedTickets);

// UPDATE
router.put('/:ticketId/resolve', verifyToken, resolveTicket);
router.put('/:ticketId/unresolve', verifyToken, unresolveTicket);

module.exports = router;
