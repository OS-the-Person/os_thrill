//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from 'semantic-ui-react'

import "semantic-ui-css/semantic.min.css"

import AppBar from "./components/AppBar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
	return (
		<Router>
			<Container text>
				<AppBar/>
				<Route exact path="/" component={Home}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/register" component={Register}/>
			</Container>
		</Router>
	);
}

export default App;
