import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            localStorage.access_token && localStorage.refresh_token
                ? <Component {...props} />
                : <Redirect to="/login"/>
        )}
    />
);

export default PrivateRoute;