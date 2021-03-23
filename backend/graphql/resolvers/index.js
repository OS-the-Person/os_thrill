const usersResolvers = require('./users');
const postsResolvers = require('./posts');
const commentsResolvers = require('./comments');
const followResolvers = require("./follow")

module.exports = {
	Post: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length
	},
	User: {
		followerCount: (parent) => parent.followers.length,
		followingCount: (parent) => parent.following.length
	},
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
		...postsResolvers.Mutation,
		...commentsResolvers.Mutation,
		...followResolvers.Mutation
    }   
}