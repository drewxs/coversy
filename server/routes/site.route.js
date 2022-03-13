const router = require('express').Router();
const {
	createSite,
	getAllSites,
	getSiteById,
	updateSiteById,
	deleteSiteById,
} = require('../controllers/site.controller');

// CREATE
router.post('/', createSite);

// READ
router.get('/', getAllSites);
router.get('/:siteID', getSiteById);

// UPDATE
router.post('/:siteID', updateSiteById);

module.exports = router;
