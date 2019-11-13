import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducer';
import {AUTH} from './actions/types';
import Home from './components/home';
import Trip from './components/trip';
import Init from './components/init';
import Login from './components/login';
import Signup from './components/signup';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const token = localStorage.getItem('token');

if (token) {
	store.dispatch({type: AUTH});
}

ReactDOM.render(
	<Provider store = {store}>
	<Router>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route  path="/blog" component={Trip}/>
			<Route  path="/init" component={Init}/>
			<Route  path="/login" component={Login}/>
			<Route  path="/signup" component={Signup}/>
		</Switch>
	</Router>
	</Provider>

, document.getElementById('root'));
