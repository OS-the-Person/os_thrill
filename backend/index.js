const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req })
});

mongoose
	.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		const PORT = process.env.PORT || 1000
		return server.listen({ port:PORT })
	})
	.then(res => {
		console.log(`Server running at ${res.url}`)
	})