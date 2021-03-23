const { UserInputError } = require('apollo-server');
const checkAuth = require("../../util/check-auth")
const User = require('../../models/User');

module.exports = {
	Mutation: {
		follow: async (_, { username }, context) => {
			var user = checkAuth(context)
			const userToFollow = await User.findOne({ username });

			if (userToFollow) {
				if (userToFollow.username !== user.username) {
					//push to current user's followering list
					username = user.username
					const thisUser = await User.findOne({ username });
					thisUser.following.push({
						username: userToFollow.username,
						createdAt: new Date().toISOString()
					})
					//push to other user's followers list
					userToFollow.followers.unshift({
						username: thisUser.username,
						createdAt: new Date().toISOString()
					})
					await userToFollow.save()
					await thisUser.save()

					return thisUser			
				} else throw new UserInputError("You cannot follow yourself bro")
			} else throw new UserInputError("User not found")
		},
		unFollow: async (_, { usernameToUnFollow }, context) => {
			const thisUser = checkAuth(context)
			
			const userToUnFollow = await User.findOne({ usernameToUnFollow });

			if (userToUnFollow) {
				//pop from other user's followers list
				userToUnFollow.followers = userToUnFollow.followers.filter(( obj ) => obj.username !== thisUser);
				//pop from current user's followering list
				thisUser.following = thisUser.following.filter(( obj ) => obj.username !== usernameToUnFollow);

				await userToFollow.save()
				await thisUser.save()
				return thisUser
			} else throw new UserInputError("User not found")
		}
	}
}