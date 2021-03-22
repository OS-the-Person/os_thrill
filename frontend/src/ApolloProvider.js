import App from "./App"
import { createHttpLink } from "apollo-link-http"
import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from "@apollo/react-hooks"
import { gql } from '@apollo/client';

//import { ApolloClient, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
	uri: "http://localhost:1000"
})

const client = new ApolloClient ({
	link: httpLink,
	cache: new InMemoryCache()
})

// const client = new ApolloClient({
// 	uri: 'https://48p1r2roz4.sse.codesandbox.io',
// 	cache: new InMemoryCache()
//   });

try {
	client.query({
		query: gql`
		query { 
			getPosts {
				id
				body
			}
		}`
	})
	.then(result => console.log(result));
} catch (err) {
	throw new Error(err)
}


export default (
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>
)