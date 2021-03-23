import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import { Header } from 'semantic-ui-react'

function Home() {
	const { data } = useQuery(FETCH_POST_QUERY)
	if (data) {
		console.log(data)
	}

	return (
		<div>
			<Header>Home Page</Header>
		</div>
	)
}

const FETCH_POST_QUERY = gql`
{	
	getPosts {
		id
		body
		createdAt
		username
		likeCount
		likes {
			username
		}
		comments {
			id 
			username 
			createdAt 
			body
		}
		commentCount
	}
}`

export default Home