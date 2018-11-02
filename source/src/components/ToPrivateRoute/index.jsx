import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import authObject from '../../service/auth';

const ToPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !authObject.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}
        />
      )
    )}
  />
);

export default ToPrivateRoute;
