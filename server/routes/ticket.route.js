const router = require('express').Router();
const {
  createTicket,
  getUnresolvedTickets,
  getResolvedTickets,
  resolveTicket,
  unresolveTicket,
} = require('../controllers/ticket.controller');
const { verifyToken, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/', verifyToken, createTicket);

// READ
router.get('/unresolved', verifyAdmin, getUnresolvedTickets);
router.get('/resolved', verifyAdmin, getResolvedTickets);

// UPDATE
router.put('/:ticketId/resolve', verifyAdmin, resolveTicket);
router.put('/:ticketId/unresolve', verifyAdmin, unresolveTicket);

module.exports = router;
