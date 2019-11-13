import {
    REGISTER
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
        case REGISTER:
            return {...state,register:action.res}
	    default:
            return state;
    }
}