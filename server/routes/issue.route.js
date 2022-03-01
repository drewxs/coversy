const router = require('express').Router();
const {
	createIssue,
	getIssueById,
	getAllIssues,
	setResolved,
} = require('../controllers/site.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/site', verifyUser, createIssue);

// READ
router.get('/site/:issueId', verifyAdmin, getIssueById);
router.get('/site', verifyAdmin, getAllIssues);
router.get('/site', verifyAdmin, getActiveIssues);

// UPDATE
router.post('/site/:issueID', verifyAdmin, setResolved);

module.exports = router;
