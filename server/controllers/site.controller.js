const Site = require('../models/site.model');
const escape = require('escape-html');
const { siteValidation } = require('../util/validation');

/**
 * This function returns all sites.
 *
 * @route GET /site/
 * @access Admin
 */
exports.getAllSites = async (req, res) => {
    try {
        const site = await Site.find().lean();
        return res.status(200).json(site);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function updates a site.
 *
 * @route PUT /site/
 * @access Admin
 */
exports.updateSite = async (req, res) => {
    const updateQuery = {
        name: escape(req.body.name),
        address: {
            street: escape(req.body.address.street),
            zip: escape(req.body.address.zip),
            city: escape(req.body.address.city),
            province: escape(req.body.address.province),
        },
    };

    const { error } = siteValidation(updateQuery);
    if (error) return res.status(400).json(error.details[0].message);

    try {
        const site = await Site.findByIdAndUpdate(req.user.site, updateQuery, {
            new: true,
        });
        return res.status(200).json(site);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
