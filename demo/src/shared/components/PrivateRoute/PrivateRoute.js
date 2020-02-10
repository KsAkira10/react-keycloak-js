import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useKeycloak } from '@ksakira10/react-keycloak-js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [keycloak] = useKeycloak();
  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
