import React from 'react';
import './App.css';

import Keycloak from 'keycloak-js';
import { KeycloakProvider } from '../../src';

import Pages from './pages';

const keycloak = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_URL,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID
});

const keycloakProviderInitConfig = {
  onLoad: 'check-sso'
};

const App = () => {
  const onKeycloakEvent = (event, error) => {
    console.log('onKeycloakEvent', event, error);
  };

  const onKeycloakTokens = tokens => {
    console.log('onKeycloakTokens', tokens);
  };

  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakProviderInitConfig}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
    >
      <Pages />
    </KeycloakProvider>
  );
};

export default App;
