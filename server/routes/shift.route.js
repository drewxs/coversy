const router = require('express').Router();
const {
	createShift,
	getAllShifts,
	getShiftById,
	getShiftsBySite,
	updateShiftById,
} = require('../controllers/shift.controller');
const { verifyShift } = require('../middleware/verify.shift');
const { verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/:siteId', createShift);
// router.post('/:siteId', verifyAdmin, createShift);

// READ
router.get('/', getAllShifts);
router.get('/:shiftId', getShiftById);
router.get('/site/:siteId', getShiftsBySite);

// UPDATE
router.put('/:shiftId', verifyShift, updateShiftById);

module.exports = router;
