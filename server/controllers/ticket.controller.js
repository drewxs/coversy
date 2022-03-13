const Ticket = require('../models/ticket.model');
const escape = require('escape-html');

exports.createTicket = async (req, res) => {
	const ticket = {
		type: escape(req.body.ticketType),
		message: escape(req.body.message),
		resolved: false,
		user: escape(user.body.user),
		site: escape(req.body.site),
		payroll: escape(req.body.payroll),
	};
	Ticket.create(ticket)
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.getTicketById = async (req, res) => {
	const ticketId = escape(req.params.ticketId);

	Ticket.findById(ticketId)
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.getAllTickets = async (req, res) => {
	Ticket.find()
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.getAllActiveTickets = async (req, res) => {
	Ticket.find({resolved: false})
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.setResolved = async (req, res) => {
    const updateQuery = {
        resolved = true,
    }
    const ticketId = escape(req.params.ticketId, { new: true })
	Ticket.findByIdAndUpdate(ticketId, updateQuery)
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
}