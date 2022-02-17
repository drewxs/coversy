const User = require('../models/user.model');
const Site = require('../models/site.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const nodemailer = require('nodemailer');
const { sendConfirmationEmail } = require('../util/nodemailer.config');
const {
	registerValidation,
	loginValidation,
	siteValidation,
} = require('../util/validation');

/**
 * @desc This endpoint logins a user
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

		if (!user.verified)
			return res
				.status(401)
				.json('Pending Account. Please Verify Your Email.');

		const token = jwt.sign(
			{ _id: user._id, type: user.type, site: user.site },
			process.env.TOKEN_SECRET
		);

		return res.status(200).json({ user, token });
	} catch (err) {
		res.status(400).json(err);
	}
};

/**
 * @desc This endpoint registers a user
 * @route POST /auth/register/user
 * @access PUBLIC
 */
exports.registerUser = async (req, res) => {
	const user = {
		firstName: escape(req.body.firstName),
		lastName: escape(req.body.lastName),
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

		const confirmationCode = jwt.sign(
			{ email: user.email },
			process.env.CONFIRMATION_CODE
		);
		user.confirmationCode = confirmationCode;

		const userRes = await User.create(user);
		const token = jwt.sign(
			{ _id: userRes._id, type: userRes.type, site: userRes.site },
			process.env.TOKEN_SECRET
		);

		sendConfirmationEmail(
			`${userRes.firstName} ${userRes.lastName}`,
			userRes.email,
			userRes.confirmationCode
		);

		return res.status(201).json({ userRes, token });
	} catch (err) {
		res.status(400).json(err);
	}
};

/**
 * @desc This endpoint registers a user
 * @route POST /auth/register/site
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
			activated: true,
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

		const confirmationCode = jwt.sign(
			{ email: user.email },
			process.env.CONFIRMATION_CODE
		);
		user.confirmationCode = confirmationCode;

		const userRes = await User.create(user);
		const token = jwt.sign(
			{ _id: userRes._id, type: userRes.type, site: userRes.site },
			process.env.TOKEN_SECRET
		);

		sendConfirmationEmail(
			`${userRes.firstName} ${userRes.lastName}`,
			userRes.email,
			userRes.confirmationCode
		);

		return res.status(201).json({ userRes, siteRes, token });
	} catch (err) {
		res.status(400).json(err);
	}
};

/**
 * @desc This endpoint verifies a user acocunt
 * @route POST /auth/confirm
 * @access PUBLIC
 */
exports.verifyUser = (req, res) => {
	User.findOne({
		confirmationCode: req.params.confirmationCode,
	})
		.then((user) => {
			if (!user) return res.status(404).json('User Not found.');

			user.verified = true;
			user.save((err) => {
				if (err) return res.status(500).send({ message: err });
			});

			return res.status(200).send('Email Successfully Verified');
		})
		.catch((err) => res.status(400).json(err));
};
