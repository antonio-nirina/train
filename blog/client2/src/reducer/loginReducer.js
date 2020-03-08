import {AUTH,UN_AUTH} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
        case AUTH:
        	return { ...state, connected: action.res, authenticated: true};
    	case UN_AUTH:
      		return { ...state, authenticated: false };
    default:
        return state;
    }
}