import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Tools from "../utils/tools";

const xc = Tools.connected()
export const RequireAuth = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (    	
        !localStorage.getItem('token') 
            ? <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
            : <Component {...props} /> 
    )} />
)