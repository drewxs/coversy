const router = require('express').Router();
const {
    createShift,
    getShiftById,
    getShiftsBySite,
    getPostedShiftsBySite,
    getShiftMaterials,
    updateShiftById,
    postShift,
    unpostShift,
    takeShift,
    updateShiftMaterials,
    deleteShiftsBySite,
    deleteShiftMaterial,
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
router.get(
    '/:shiftId/files/:fileName',
    verifyToken,
    verifyShift,
    getShiftMaterials
);

// UPDATE
router.put('/:shiftId', verifyToken, verifyShift, updateShiftById);
router.put('/:shiftId/post', verifyToken, verifyShift, postShift);
router.put('/:shiftId/unpost', verifyToken, verifyShift, unpostShift);
router.put('/:shiftId/take', verifyToken, verifyShift, takeShift);
router.put(
    '/:shiftId/uploadfiles',
    verifyToken,
    uploadMaterials.array('materials', 10),
    updateShiftMaterials
);

// DELETE
router.delete('/', verifyAdmin, deleteShiftsBySite);
router.delete(
    '/:shiftId/:fileKey',
    verifyToken,
    verifyShift,
    deleteShiftMaterial
);

module.exports = router;
