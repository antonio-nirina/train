import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import reduxThunk from 'redux-thunk';

import Home from './components/home';
import Trip from './components/trip';
import Init from './components/init';
import Login from './components/login';



ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route  path="/blog" component={Trip}/>
			<Route  path="/init" component={Init}/>
			<Route  path="/login" component={Login}/>
		</Switch>
	</Router>

, document.getElementById('root'));
