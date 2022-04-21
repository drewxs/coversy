const Ticket = require('../models/ticket.model');
const escape = require('escape-html');
const {
    createNotification,
} = require('../controllers/notification.controller');

/** @module ticket_controller */

/**
 * This function creates a ticket.
 *
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Created ticket
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
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} - Unresolved tickets
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
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} - Resolved tickets
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
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Ticket resolved
 */
exports.resolveTicket = async (req, res) => {
    const ticketId = escape(req.params.ticketId);

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            ticketId,
            { resolved: true },
            { new: true }
        ).populate('user', 'firstName lastName email phone');

        if (ticket.type == 1) {
            createNotification(ticket.user, null, `Payroll`, ticket);
        } else {
            createNotification(ticket.user, null, `TimeOff`, ticket);
        }

        return res.status(200).json(ticket);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function unresolves a ticket.
 *
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Ticket unresolved
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
