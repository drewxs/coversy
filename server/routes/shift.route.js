const router = require('express').Router();
const {
	createShift,
	getShiftById,
	getShiftsBySite,
	getPostedShiftsBySite,
	updateShiftById,
	deleteShiftsBySite,
	updateShiftMaterials,
} = require('../controllers/shift.controller');
const { verifyShift } = require('../middleware/verify.shift');
const { uploadMaterials } = require('../middleware/s3.uploader');
const { verifyToken, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/', verifyAdmin, createShift);

// READ
router.get('/:shiftId', verifyToken, getShiftById);
router.get('/', verifyToken, getShiftsBySite);
router.get('/posted', verifyToken, getPostedShiftsBySite);

// UPDATE
router.put('/:shiftId', verifyToken, verifyShift, updateShiftById);
router.put(
	'/:shiftID/uploadfiles',
	verifyShift,
	uploadMaterials.array('materials', 10),
	updateShiftMaterials
);

// DELETE
router.delete('/', verifyAdmin, deleteShiftsBySite);

module.exports = router;
