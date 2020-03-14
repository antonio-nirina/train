import {
    REGISTER,
    POSTLIST,
    POST_CREATE,
    FETCH_PROFILE,
    FETCH_NOTIF
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
        case REGISTER:
            return {...state,register:action.res}
        case POSTLIST:
            return {...state,listPost:action.res}
        case POST_CREATE:
            return {...state,created:action.res}
        case FETCH_PROFILE:
            return {...state,profils:action.res}
        case FETCH_NOTIF:
            return {...state,notif:action.res}
	    default:
            return state;
    }
}