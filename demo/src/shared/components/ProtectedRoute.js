import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '../../../../src';

const ProtectedRoute = ({ children, ...rest }) => {
  const { keycloak } = useKeycloak();
  console.log('keycloak.authenticated: ', keycloak.authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        typeof keycloak.authenticated === 'undefined' ||
        keycloak.authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
