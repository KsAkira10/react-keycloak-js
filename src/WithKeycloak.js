import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { KeycloakContext as Context } from './Provider';

const getDisplayName = name => `WithKeycloak(${name})`;

const withKeycloak = Component => {
  const displayName = getDisplayName(Component.displayName || Component.name);

  const WithKeycloakComponent = props => {
    const componentRendered = ({ initialized, keycloak }) => (
      <Component
        {...props}
        keycloak={keycloak}
        keycloakInitialized={initialized}
      />
    );
    return <Context.Consumer>{componentRendered}</Context.Consumer>;
  };

  WithKeycloakComponent.WrappedComponent = WrappedComponent;
  WithKeycloakComponent.displayName = displayName;

  return hoistStatics(WithKeycloakComponent, Component);
};

export default withKeycloak;
