import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom"

function AppBar() {
	//var [activeTab, setActiveTab] = useState("home")
	const pathname = window.location.pathname
	const path = pathname === "/" ? "home" : pathname.substr(1)

	const [activeTab, setActiveTab] = useState(path)
	const handleTabClick = (e, { name }) => setActiveTab(name)

	return (
		<div>
			<Menu pointing secondary size="massive" color="blue">
				<Menu.Item
					name='home'
					active={activeTab === 'home'}
					onClick={handleTabClick}
					as={Link}
					to="/"
				/>
				<Menu.Menu position='right'>
					<Menu.Item
						name='Login'
						active={activeTab === 'login'}
						onClick={handleTabClick}
						as={Link}
						to="/login"
					/>
					<Menu.Item
						name='Register'
						active={activeTab === 'register'}
						onClick={handleTabClick}
						as={Link}
						to="/register"
					/>
				</Menu.Menu>
			</Menu>
		</div>
	);
}

export default AppBar