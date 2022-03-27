const router = require('express').Router();
const {
    createShift,
    getShiftById,
    getShiftsBySite,
    getPostedShiftsBySite,
    getShiftMaterials,
    updateShiftById,
    postShift,
    takeShift,
    updateShiftMaterials,
    deleteShiftsBySite,
} = require('../controllers/shift.controller');
const { verifyShift } = require('../middleware/verify.shift');
const { uploadMaterials } = require('../middleware/s3.uploader');
const { verifyToken, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/', verifyAdmin, createShift);

// READ
router.get('/id/:shiftId', verifyToken, getShiftById);
router.get('/', verifyToken, getShiftsBySite);
router.get('/posted/', verifyToken, getPostedShiftsBySite);
router.get('/:shiftId/files/:fileName', getShiftMaterials);

// UPDATE
router.put('/:shiftId', verifyToken, verifyShift, updateShiftById);
router.put('/:shiftId/post', verifyToken, postShift);
router.put('/:shiftId/take', verifyToken, takeShift);
router.put(
    '/:shiftId/uploadfiles',
    verifyToken,
    uploadMaterials.array('materials', 10),
    updateShiftMaterials
);

// DELETE
router.delete('/', verifyAdmin, deleteShiftsBySite);

module.exports = router;
