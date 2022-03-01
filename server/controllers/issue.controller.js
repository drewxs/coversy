const Issue = require('../models/issue.model');
const escape = require('escape-html');

exports.createSite = async (req, res) => {
	const issue = {
		issueType: escape(req.body.issueType),
		message: escape(req.body.message),
		resolved: false,
		site: escape(req.body.site),
		payroll: escape(req.body.payroll),
	};
	Site.create(issue)
		.then((issue) => res.status(200).json(issue))
		.catch((err) => res.status(400).json(err));
};

exports.getIssueById = async (req, res) => {
	const issueId = escape(req.params.issueId);

	Issue.findById(issueId)
		.then((issue) => res.status(200).json(issue))
		.catch((err) => res.status(400).json(err));
};

exports.getAllIssues = async (req, res) => {
	Issue.find()
		.then((issue) => res.status(200).json(issue))
		.catch((err) => res.status(400).json(err));
};

exports.getAllActiveIssues = async (req, res) => {
	Issue.find({resolved: false})
		.then((issue) => res.status(200).json(issue))
		.catch((err) => res.status(400).json(err));
};

exports.setResolved = async (req, res) => {
    const updateQuery = {
        resolved = true,
    }
    const issueId = escape(req.params.issueId)
	Issue.findByIdAndUpdate(issueId, updateQuery)
		.then((issue) => res.status(200).json(issue))
		.catch((err) => res.status(400).json(err));
}