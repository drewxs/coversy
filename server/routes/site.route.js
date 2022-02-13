const router = require('express').Router();
const {
	createSite,
	getAllSites,
	getSiteById,
	getSiteByName,
	updateSiteById,
	deleteSiteById,
} = require('../controllers/site.controller');

// CREATE
router.post('/', createSite);

// READ
router.get('/', getAllSites);
router.get('/:siteID', getSiteById);
router.get('/:siteName', getSiteByName);

// UPDATE
router.post('/:siteID', updateSiteById);

// DELETE
router.post('/:siteID', deleteSiteById);

module.exports = router;
