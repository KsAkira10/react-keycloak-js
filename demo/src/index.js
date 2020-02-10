import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from '@react-keycloak/web';
import Pages from './pages';
import configureStore from './store/configureStore';
import { $ } from './shared/utils';

import * as serviceWorker from './serviceWorker';

const store = configureStore();

const keycloak = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM || 'react-oidc-app',
  url: process.env.REACT_APP_KEYCLOAK_URL || 'http://localhost:8080/auth',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'react-oidc-app'
});

const keycloakProviderInitConfig = {
  onLoad: 'check-sso'
};

const onKeycloakEvent = (event, error) => {
  console.log('onKeycloakEvent', event, error);
};

const onKeycloakTokens = tokens => {
  console.log('onKeycloakTokens', tokens);
};

ReactDOM.render(
  <Provider store={store}>
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakProviderInitConfig}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
    >
      <Pages />
    </KeycloakProvider>
  </Provider>,
  $('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
