import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducer';
import {AUTH} from './actions/types';
import Home from './components/home';
import Login from './components/login';
import {RequireAuth}from './components/requireAuth';

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
			<Route  path="/signin" component={Login}/>
		</Switch>
	</Router>
	</Provider>

, document.getElementById('root'));
