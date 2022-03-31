const router = require('express').Router();
const {
    getAllSites,
    getSiteById,
    updateSiteById,
} = require('../controllers/site.controller');
const { verifyAdmin } = require('../middleware/verify');

// READ
router.get('/', getAllSites);
router.get('/:siteID', getSiteById);

// UPDATE
router.put('/', verifyAdmin, updateSiteById);

module.exports = router;
