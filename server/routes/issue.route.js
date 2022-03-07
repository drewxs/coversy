const router = require('express').Router();
const {
	createIssue,
	getIssueById,
	getAllIssues,
	setResolved,
} = require('../controllers/site.controller');
const { verifyUser, verifyAdmin } = require('../middleware/verify');

// CREATE
router.post('/site', createIssue);

// READ
router.get('/site/:issueId', getIssueById);
router.get('/site', getAllIssues);
router.get('/site', getActiveIssues);

// UPDATE
router.post('/site/:issueID', setResolved);

module.exports = router;
