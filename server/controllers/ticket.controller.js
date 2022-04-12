const Ticket = require('../models/ticket.model');
const escape = require('escape-html');

/**
 * This function creates a ticket.
 *
 * @route POST /ticket/
 * @access User
 */
exports.createTicket = async (req, res) => {
    const ticket = {
        type: escape(req.body.type),
        message: escape(req.body.message),
        resolved: false,
        user: req.user,
        site: req.user.site,
    };

    Ticket.create(ticket)
        .then((ticket) => res.status(200).json(ticket))
        .catch((err) => res.status(400).json(err));
};

/**
 * This function gets unresolved tickets.
 *
 * @route GET /ticket/unresolved
 * @access Admin
 */
exports.getUnresolvedTickets = async (req, res) => {
    const site = req.user.site;

    Ticket.find({ site, resolved: false })
        .lean()
        .populate('user', 'firstName lastName email phone')
        .then((ticket) => res.status(200).json(ticket))
        .catch((err) => res.status(400).json(err));
};

/**
 * This function gets resolved tickets.
 *
 * @route GET /ticket/resolved
 * @access Admin
 */
exports.getResolvedTickets = async (req, res) => {
    const site = req.user.site;

    Ticket.find({ site, resolved: true })
        .lean()
        .populate('user', 'firstName lastName email phone')
        .then((ticket) => res.status(200).json(ticket))
        .catch((err) => res.status(400).json(err));
};

/**
 * This function resolves a ticket.
 *
 * @route PUT /ticket/:ticketId/resolve
 * @access Admin
 */
exports.resolveTicket = (req, res) => {
    const updateQuery = {
        resolved: true,
    };
    const ticketId = escape(req.params.ticketId);

    Ticket.findByIdAndUpdate(ticketId, updateQuery, { new: true })
        .populate('user', 'firstName lastName email phone')
        .then((ticket) => res.status(200).json(ticket))
        .catch((err) => res.status(400).json(err));
};

/**
 * This function unresolves a ticket.
 *
 * @route PUT /ticket/:ticketId/unresolve
 * @access Admin
 */
exports.unresolveTicket = (req, res) => {
    const updateQuery = {
        resolved: false,
    };
    const ticketId = escape(req.params.ticketId);

    Ticket.findByIdAndUpdate(ticketId, updateQuery, { new: true })
        .populate('user', 'firstName lastName email phone')
        .then((ticket) => res.status(200).json(ticket))
        .catch((err) => res.status(400).json(err));
};
