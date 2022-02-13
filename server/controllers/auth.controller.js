const User = require('../models/user.model');
const Site = require('../models/site.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const {
	registerValidation,
	loginValidation,
	siteValidation,
} = require('../util/validation');

/**
 * @desc This function registers a user
 * @route POST /auth/register/user
 * @access PUBLIC
 */
exports.registerUser = async (req, res) => {
	const user = {
		firstName: escape(req.body.firstName),
		lastName: escape(req.body.lastName),
		type: 2,
		email: escape(req.body.email),
		password: req.body.password,
		site: escape(req.body.site),
	};
	if (req.body.middleInitial)
		user.middleInitial = escape(req.body.middleInitial);

	const { error } = registerValidation(user);
	if (error) return res.status(400).json(error.details[0].message);

	try {
		const userExists = await User.findOne({ email: user.email });
		if (userExists) return res.status(400).json('Email already exists');

		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(user.password, salt);

		user.password = hashedPass;

		const userRes = User.create(user);
		const token = jwt.sign(
			{ _id: userRes._id, type: userRes.type },
			process.env.TOKEN_SECRET
		);

		return res.status(201).json({ userRes, token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

/**
 * @desc This function logins a user
 * @route POST /auth/login
 * @access PUBLIC
 */
exports.login = async (req, res) => {
	const email = escape(req.body.email);
	const password = req.body.password;

	const { error } = loginValidation(req.body);
	if (error) return res.status(400).json(error.details[0].message);

	try {
		const user = await User.findOne({ email: email });
		if (!user) return res.status(404).json('Email not found');

		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) return res.status(400).json('Invalid password');

		const token = jwt.sign(
			{ _id: user._id, type: user.type },
			process.env.TOKEN_SECRET
		);

		return res.status(201).json({ user, token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

/**
 * @desc This function registers a user
 * @route POST /auth/register/user
 * @access PUBLIC
 */
exports.registerSite = async (req, res) => {
	try {
		const site = {
			name: escape(req.body.name),
			address: {
				street: escape(req.body.address.street),
				zip: escape(req.body.address.zip),
				city: escape(req.body.address.city),
				province: escape(req.body.address.province),
			},
		};

		const user = {
			firstName: 'SITE',
			lastName: 'ADMIN',
			type: 1,
			email: escape(req.body.email),
			password: req.body.password,
		};

		const { siteValidationError } = siteValidation(site);
		if (siteValidationError)
			return res.status(400).json(error.details[0].message);

		const { registerValidationError } = registerValidation(user);
		if (registerValidationError)
			return res.status(400).json(error.details[0].message);

		const userExists = await User.findOne({
			email: escape(req.body.email),
		});
		if (userExists) return res.status(400).json('Email already exists');

		const siteRes = await Site.create(site);
		user.site = siteRes._id;

		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(user.password, salt);
		user.password = hashedPass;

		const userRes = await User.create(user);
		const token = jwt.sign(
			{ _id: userRes._id, type: userRes.type },
			process.env.TOKEN_SECRET
		);

		return res.status(201).json({ userRes, siteRes, token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
