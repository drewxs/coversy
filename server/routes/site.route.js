const router = require('express').Router();
const { getAllSites, updateSite } = require('../controllers/site.controller');
const { verifyAdmin } = require('../middleware/verify');

// READ
router.get('/', getAllSites);

// UPDATE
router.put('/', verifyAdmin, updateSite);

module.exports = router;
