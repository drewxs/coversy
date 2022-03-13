const router = require('express').Router();
const {
	createShift,
	getShiftById,
	getShiftsBySite,
	getPostedShiftsBySite,
	updateShiftById,
	deleteShiftsBySite,
} = require('../controllers/shift.controller');
const { verifyShift } = require('../middleware/verify.shift');
const { verifyToken, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/site/:siteId', verifyAdmin, createShift);

// READ
router.get('/:shiftId', verifyToken, getShiftById);
router.get('/', verifyToken, getShiftsBySite);
router.get('/posted', verifyToken, getPostedShiftsBySite);

// UPDATE
router.put('/:shiftId', verifyToken, verifyShift, updateShiftById);

// DELETE
router.delete('/site/:siteId', verifyAdmin, deleteShiftsBySite);

module.exports = router;
