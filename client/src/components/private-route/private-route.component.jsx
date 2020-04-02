import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, props,...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => localStorage.getItem('user') !== null ? <Component {...props} /> : <Redirect to={{ pathname: '/login-page', state: { from: props.location } }} />
            }
        />
    )
}
export default PrivateRoute;