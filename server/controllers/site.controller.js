const Site = require('../models/site.model');

/**
 *
 * @desc This function registers a site.
 * @route POST /site/
 * @access Admin
 */
exports.createSite = async (req, res) => {};

/**
 *
 * @desc This function returns all sites.
 * @route GET /site/
 * @access Admin
 */
exports.getAllSites = async (req, res) => {};

/**
 *
 * @desc This function returns sites by ID.
 * @route GET /site/:siteId
 * @access Admin
 */
exports.getSiteById = async (req, res) => {};

/**
 *
 * @desc This function returns sites by name.
 * @route GET /site/:siteName
 * @access Admin
 */
exports.getSiteByName = async (req, res) => {};

/**
 *
 * @desc This function updates sites by ID.
 * @route PUT /site/:siteId
 * @access Admin
 */
exports.updateSiteById = async (req, res) => {};

/**
 *
 * @desc This function deletes sites by ID.
 * @route DELETE /site/:siteId
 * @access Admin
 */
exports.deleteSiteById = async (req, res) => {};
