const router = require('express').Router();
const {
    createSite,
    getAllSites,
    getSiteById,
    updateSiteById,
    deleteSiteById,
} = require('../controllers/site.controller');
const { verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/', createSite);

// READ
router.get('/', getAllSites);
router.get('/:siteID', getSiteById);

// UPDATE
router.put('/', verifyAdmin, updateSiteById);

module.exports = router;
