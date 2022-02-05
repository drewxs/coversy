const User = require('../models/user.model');

//CREATE

/**
 *
 * @desc This function registers a user.
 * @route POST /user/
 * @access Admin
 */
exports.registerUser = async (req, res) => {};

/**
 *
 * @desc This function logs in a user.
 * @route POST /user/
 * @access Admin
 */
exports.loginUser = async (req, res) => {};
//READ

/**
 *
 * @desc This function returns all users.
 * @route GET /user/
 * @access Admin
 */
exports.getAllUsers = async (req, res) => {};

/**
 *
 * @desc This function returns users by user id.
 * @route GET /user/:userId
 * @access Admin
 */
exports.getUserById = async (req, res) => {};

/**
 *
 * @desc This function returns users by first name.
 * @route GET /user/:firstName/:siteId
 * @access Admin
 */
exports.getUserByFirstName = async (req, res) => {};

/**
 *
 * @desc This function returns users by last name.
 * @route GET /user/:lastName/:siteId
 * @access Admin
 */
exports.getUserByLastName = async (req, res) => {};

/**
 *
 * @desc This function returns users by email.
 * @route GET /user/:email/:siteId
 * @access Admin
 */
exports.getUserByEmail = async (req, res) => {};

/**
 *
 * @desc This function returns users by site.
 * @route GET /user/:siteid
 * @access Admin
 */
exports.getUserBySite = async (req, res) => {};

//UPDATE

/**
 *
 * @desc This function updates users by id.
 * @route PUT /user/:userId
 * @access Admin
 */
exports.updateUserById = async (req, res) => {};

//DELETE

/**
 *
 * @desc This function deletes users by id.
 * @route DELETE /user/:userId
 * @access Admin
 */
exports.deleteUserById = async (req, res) => {};

/**
 *
 * @desc This function deletes users by email.
 * @route DELETE /user/:email
 * @access Admin
 */
exports.deleteUserByEmail = async (req, res) => {};

/**
 *
 * @desc This function deletes users by Site.
 * @route DELETE /user/:siteId
 * @access Admin
 */
exports.deleteUserBySite = async (req, res) => {};
