const Site = require('../models/site.model');
const escape = require('escape-html');

/**
 *
 * @desc This function registers a site.
 * @route POST /site/
 * @access Admin
 */
exports.createSite = async (req, res) => {
	const location = {
		name: escape(req.body.name),
		address: {
			street: escape(req.body.address.street),
			zip: escape(req.body.address.zip),
			city: escape(req.body.address.city),
			province: escape(req.body.address.province),
		},
	};
	Site.create(location)
		.then((site) => res.status(200).json(site))
		.catch((err) => res.status(400).json(err));
};

/**
 *
 * @desc This function returns all sites.
 * @route GET /site/
 * @access Admin
 */
exports.getAllSites = async (req, res) => {
	Site.find()
		.then((site) => res.status(200).json(site))
		.catch((err) => res.status(400).json(err));
};

/**
 *
 * @desc This function returns sites by ID.
 * @route GET /site/:siteId
 * @access Admin
 */
exports.getSiteById = async (req, res) => {
	const siteId = escape(req.params.siteId);

	Site.findById(siteId)
		.then((site) => res.status(200).json(site))
		.catch((err) => res.status(400).json(err));
};

/**
 *
 * @desc This function updates sites by ID.
 * @route PUT /site/:siteId
 * @access Admin
 */
exports.updateSiteById = async (req, res) => {
	const updateQuery = {};
	if (req.body.name) {
		updateQuery.name = escape(req.body.name);
	}
	if (req.body.address) {
		updateQuery.address = {
			street: escape(req.body.address.street),
			zip: escape(req.body.address.zip),
			city: escape(req.body.address.city),
			province: escape(req.body.address.province),
		};
	}
	const siteId = escape(req.params.siteId);

	Site.findByIdAndUpdate(siteId, updateQuery)
		.then((site) => res.status(200).json(site))
		.catch((err) => res.status(400).json(err));
};

/**
 *
 * @desc This function deletes sites by ID.
 * @route DELETE /site/:siteId
 * @access SysAdmin
 */
exports.deleteSiteById = async (req, res) => {
	const siteId = escape(req.params.siteId);

	Site.findByIdAndDelete(siteId)
		.then((site) => res.status(200).json(site))
		.catch((err) => res.status(400).json(err));
};
