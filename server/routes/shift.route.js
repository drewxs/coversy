const router = require('express').Router();
const {
	createShift,
	getAllShifts,
	getShiftById,
	getShiftsBySite,
	updateShiftById,
	deleteShiftById,
} = require('../controllers/shift.controller');

// CREATE
router.post('/', createShift);

// READ
router.get('/', getAllShifts);
router.get('/:shiftId', getShiftById);
router.get('/:siteId', getShiftsBySite);
// UPDATE
router.put('/:shiftId', updateShiftById);
// DELETE
router.delete('/:shiftId', deleteShiftById);

module.exports = router;
