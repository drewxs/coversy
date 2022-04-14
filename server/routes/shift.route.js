const router = require('express').Router();
const {
    createShift,
    getShiftById,
    getShiftsBySite,
    getShiftsByUser,
    getPostedShiftsBySite,
    getShiftMaterials,
    updateShiftById,
    postShift,
    unpostShift,
    takeShift,
    returnShift,
    updateShiftMaterials,
    deleteShiftsBySite,
    deleteShiftMaterial,
} = require('../controllers/shift.controller');
const { verifyShift, verifyShiftSub } = require('../middleware/verify.shift');
const { uploadMaterials } = require('../middleware/s3.uploader');
const { verifyToken, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/', verifyAdmin, createShift);

// READ
router.get('/id/:shiftId', verifyToken, getShiftById);
router.get('/', verifyToken, getShiftsBySite);
router.get('/user', verifyToken, getShiftsByUser);
router.get('/posted', verifyToken, getPostedShiftsBySite);
router.get(
    '/:shiftId/files/:fileKey',
    verifyToken,
    verifyShift,
    getShiftMaterials
);

// UPDATE
router.put('/:shiftId', verifyToken, verifyShift, updateShiftById);
router.put('/:shiftId/post', verifyToken, verifyShift, postShift);
router.put('/:shiftId/unpost', verifyToken, verifyShift, unpostShift);
router.put('/:shiftId/take', verifyToken, takeShift);
router.put('/:shiftId/return', verifyToken, verifyShiftSub, returnShift);
router.put(
    '/:shiftId/files/upload',
    verifyToken,
    uploadMaterials.array('materials', 10),
    updateShiftMaterials
);

// DELETE
router.delete('/', verifyAdmin, deleteShiftsBySite);
router.delete(
    '/:shiftId/files/:fileKey',
    verifyToken,
    verifyShift,
    deleteShiftMaterial
);

module.exports = router;
