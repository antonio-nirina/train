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
import {RequireAuth}from './components/requireAuth';
import Profile from './components/profile';
import Contact from './components/contact';

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
			<RequireAuth exact path="/" component={Home} />
			{/*<RequireAuth 
    			exact path="/" 
    			render={(props) => <Home {...props} socket={socket}/>} 
			/>*/}
			<Route  path="/dashboard" component={Trip}/>
			<Route  path="/init" component={Init}/>
			<Route  path="/signin" component={Login}/>
			<Route  path="/signup" component={Signup}/>
			<RequireAuth  path="/profile" component={Profile}/>
			<Route  path="/contact" component={Contact}/>
		</Switch>
	</Router>
	</Provider>

, document.getElementById('root'));
