const Ticket = require('../models/ticket.model');
const escape = require('escape-html');

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

exports.getUnresolvedTickets = async (req, res) => {
	const site = req.user.site;

	Ticket.find({ site, resolved: false })
		.populate('user', 'firstName lastName email phone')
		.populate('site', 'name')
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.getResolvedTickets = async (req, res) => {
	const site = req.user.site;

	Ticket.find({ site, resolved: true })
		.populate('user', 'firstName lastName email phone')
		.populate('site', 'name')
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.resolveTicket = (req, res) => {
	const updateQuery = {
		resolved: true,
	};
	const ticketId = escape(req.params.ticketId);
	Ticket.findByIdAndUpdate(ticketId, updateQuery, { new: true })
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};

exports.unresolveTicket = (req, res) => {
	const updateQuery = {
		resolved: false,
	};
	const ticketId = escape(req.params.ticketId);
	Ticket.findByIdAndUpdate(ticketId, updateQuery, { new: true })
		.then((ticket) => res.status(200).json(ticket))
		.catch((err) => res.status(400).json(err));
};
