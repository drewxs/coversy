const router = require('express').Router();
const {
	createShift,
	getAllShifts,
	getShiftById,
	getShiftsBySite,
	updateShiftById,
	deleteShiftsBySite,
} = require('../controllers/shift.controller');
const { verifyShift } = require('../middleware/verify.shift');
const { verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/site/:siteId', verifyAdmin, createShift);

// READ
router.get('/', getAllShifts);
router.get('/:shiftId', getShiftById);
router.get('/site/:siteId', getShiftsBySite);

// UPDATE
router.put('/:shiftId', verifyShift, updateShiftById);

// DELETE
router.delete('/site/:siteId', verifyAdmin, deleteShiftsBySite);

module.exports = router;
