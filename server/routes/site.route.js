const router = require('express').Router();
const {
    getAllSites,
    getSiteById,
    updateSite,
} = require('../controllers/site.controller');
const { verifyAdmin } = require('../middleware/verify');

// READ
router.get('/', getAllSites);
router.get('/:siteID', getSiteById);

// UPDATE
router.put('/', verifyAdmin, updateSite);

module.exports = router;
