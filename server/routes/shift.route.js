const router = require('express').Router();
const {
	createShift,
	getAllShifts,
	getShiftById,
	getShiftsBySite,
	updateShiftById,
} = require('../controllers/shift.controller');
const { verifyShift } = require('../middleware/verify.shift');

// CREATE
router.post('/', createShift);

// READ
router.get('/', getAllShifts);
router.get('/:shiftId', getShiftById);
router.get('/site/:siteId', getShiftsBySite);

// UPDATE
router.put('/:shiftId', verifyShift, updateShiftById);

module.exports = router;
