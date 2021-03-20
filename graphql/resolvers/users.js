const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput } = require('../../util/validators');
const  SECRET_KEY  = process.env.SECRET_KEY;
const User = require('../../models/User');

module.exports = {
	Mutation: {
		async register(_, { registerInput : { username, email, password, confirmedPassword }}) {
			// valdate user data
			const { valid, errors } = validateRegisterInput(username, email, password, confirmedPassword)
			if (!valid) {
				throw new UserInputError('Errors', { errors }); 
			}
			// unique users check
			const user = await User.findOne({ username });

			if (user) {
				throw new UserInputError("Username is taken", {
					errors: {
						username: `username  >> ${ Object.keys(user) } is taken`
					}
				})
			}

			// hash pass 
			password = await bcrypt.hash(password, 12);
	
			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString()
			});

			const res = await newUser.save();

			// create auth token
			const token = jwt.sign({
				id: res.id,
				email: res.email,
				username: res.username
			}, SECRET_KEY, { expiresIn: '1h' });

			return {
				...res._doc,
				id: res._id,
				token
			};
		}
	}
}