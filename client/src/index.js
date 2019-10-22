import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import reduxThunk from 'redux-thunk';

import Home from './components/home';
import Trip from './components/trip';



ReactDOM.render(
	<Provider >
			<Router>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route  path="/trip" component={Trip}/>
				</Switch>
			</Router>
		</Provider>

, document.getElementById('root'));
