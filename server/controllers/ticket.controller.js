const Ticket = require('../models/ticket.model');
const escape = require('escape-html');

/**
 * This function creates a ticket.
 *
 * @route POST /ticket/
 * @access User
 */
exports.createTicket = async (req, res) => {
    const newTicket = {
        type: escape(req.body.type),
        message: escape(req.body.message),
        resolved: false,
        user: req.user,
        site: req.user.site,
    };

    try {
        const ticket = await Ticket.create(newTicket);
        return res.status(200).json(ticket);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function gets unresolved tickets.
 *
 * @route GET /ticket/unresolved
 * @access Admin
 */
exports.getUnresolvedTickets = async (req, res) => {
    const site = req.user.site;

    try {
        const tickets = await Ticket.find({ site, resolved: false })
            .lean()
            .populate('user', 'firstName lastName email phone');
        return res.status(200).json(tickets);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function gets resolved tickets.
 *
 * @route GET /ticket/resolved
 * @access Admin
 */
exports.getResolvedTickets = async (req, res) => {
    const site = req.user.site;

    try {
        const tickets = await Ticket.find({ site, resolved: true })
            .lean()
            .populate('user', 'firstName lastName email phone');
        return res.status(200).json(tickets);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function resolves a ticket.
 *
 * @route PUT /ticket/:ticketId/resolve
 * @access Admin
 */
exports.resolveTicket = async (req, res) => {
    const ticketId = escape(req.params.ticketId);

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            ticketId,
            { resolved: true },
            { new: true }
        ).populate('user', 'firstName lastName email phone');
        return res.status(200).json(ticket);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function unresolves a ticket.
 *
 * @route PUT /ticket/:ticketId/unresolve
 * @access Admin
 */
exports.unresolveTicket = async (req, res) => {
    const ticketId = escape(req.params.ticketId);

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            ticketId,
            { resolved: false },
            { new: true }
        ).populate('user', 'firstName lastName email phone');
        return res.status(200).json(ticket);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
