import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';
import loginReducer from './loginReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	login: loginReducer,
	form: formReducer,
	user:userReducer,
})

export default rootReducer;