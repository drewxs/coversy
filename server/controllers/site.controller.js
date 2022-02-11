const Site = require('../models/site.model');

/**
 *
 * @desc This function registers a site.
 * @route POST /site/
 * @access Admin
 */
exports.createSite = async (req, res) => {
	Site.create(req.body)
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
	Site.findById(req.params.siteId)
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
		updateQuery.name = req.body.name;
	}
	if (req.body.address) {
		updateQuery.address = req.body.address;
	}
	Site.findByIdAndUpdate(req.params.siteId, updateQuery)
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
	Site.findByIdAndDelete(req.params.siteId)
		.then((site) => res.status(200).json(site))
		.catch((err) => res.status(400).json(err));
};
