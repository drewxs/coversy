const Ticket = require('../models/ticket.model');
const escape = require('escape-html');

exports.createTicket = async (req, res) => {
	const ticket = {
		type: escape(req.body.ticketType),
		message: escape(req.body.message),
		resolved: false,
		user: req.user,
		site: req.user.site,
		payroll: escape(req.body.payroll),
	};
	Ticket.create(ticket)
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.getUnresolvedTickets = async (req, res) => {
	const site = escape(req.params.siteId);

	Ticket.find({ site, resolved: false })
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.getResolvedTickets = async (req, res) => {
	const site = escape(req.params.siteId);

	Ticket.find({ site, resolved: true })
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.resolveTicket = async (req, res) => {
	const updateQuery = {
		resolved: true,
	};
	const ticketId = escape(req.params.ticketId, { new: true });
	Ticket.findByIdAndUpdate(ticketId, updateQuery)
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};
