//import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';

function App() {
	return (
		<Router>
			<Route exact path="/" component={Home}/>
			<Route exact path="/login" component={Login}/>
			<Route exact path="/register" component={Register}/>
		</Router>
	);
}

export default App;
