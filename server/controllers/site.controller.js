const Site = require('../models/site.model');
const escape = require('escape-html');
const { siteValidation } = require('../util/validation');

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

    const { error } = siteValidation(location);
    if (error) return res.status(400).json(error.details[0].message);

    Site.create(location)
        .then((site) => res.status(201).json(site))
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

    const { error } = siteValidation(updateQuery);
    if (error) return res.status(400).json(error.details[0].message);

    Site.findByIdAndUpdate(siteId, updateQuery, { new: true })
        .then((site) => res.status(200).json(site))
        .catch((err) => res.status(400).json(err));
};
