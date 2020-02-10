import React, { useState, useEffect } from 'react';
import { element, shape, func, string } from 'prop-types';
import createKeycloakContext from './Context';

export const createKeycloakProvider = KeycloakContext => {
  const initialState = {
    initialized: false,
    isLoading: true,
    token: undefined
  };

  const defaultInitConfig = {
    onLoad: 'check-sso',
    promiseType: 'native'
  };

  const keycloakProvider = ({
    children,
    keycloak,
    LoadingComponent,
    initialized,
    initConfig,
    onEvent,
    onTokens,
    isLoadingCheck
  }) => {
    const [state, setState] = useState({ ...initialState });

    const onKeycloakError = event => error => onEvent && onEvent(event, error);

    const updateState = event => () => {
      const {
        initialized: prevInitialized,
        isLoading: prevLoading,
        token: prevToken
      } = state;
      const { idToken, refreshToken, token: newToken } = keycloak;

      // Notify Events listener
      onEvent && onEvent(event);

      // Check Loading state
      const isLoading = isLoadingCheck ? isLoadingCheck(keycloak) : false;

      // Avoid double-refresh if state hasn't changed
      if (
        !prevInitialized ||
        isLoading !== prevLoading ||
        newToken !== prevToken
      ) {
        setState({
          initialized: true,
          isLoading,
          token: newToken
        });
      }

      // Notify token listener, if any
      if (newToken !== prevToken) {
        onTokens &&
          onTokens({
            idToken,
            refreshToken,
            token: newToken
          });
      }
    };

    const refreshKeycloakToken = event => () => {
      onEvent && onEvent(event);

      // Refresh Keycloak token
      keycloak.updateToken(5);
    };

    const init = () => {
      // Attach Keycloak listeners
      keycloak.onReady = updateState('onReady');
      keycloak.onAuthSuccess = updateState('onAuthSuccess');
      keycloak.onAuthError = onKeycloakError('onAuthError');
      keycloak.onAuthRefreshSuccess = updateState('onAuthRefreshSuccess');
      keycloak.onAuthRefreshError = onKeycloakError('onAuthRefreshError');
      keycloak.onAuthLogout = updateState('onAuthLogout');
      keycloak.onTokenExpired = refreshKeycloakToken('onTokenExpired');

      keycloak.init({ ...defaultInitConfig, ...initConfig });
    };

    useEffect(() => {
      console.log('init')
      init();

      return () => {
        console.log('clean init')
        keycloak.onReady = undefined;
        keycloak.onAuthSuccess = undefined;
        keycloak.onAuthError = undefined;
        keycloak.onAuthRefreshSuccess = undefined;
        keycloak.onAuthRefreshError = undefined;
        keycloak.onAuthLogout = undefined;
        keycloak.onTokenExpired = undefined;
      };
    }, []);

    if (!!LoadingComponent && (!state.initialized || state.isLoading)) {
      return LoadingComponent;
    }

    return (
      <KeycloakContext.Provider value={{ initialized, keycloak }}>
        {children}
      </KeycloakContext.Provider>
    );
  };

  keycloakProvider.propTypes = {
    children: element.isRequired,
    keycloak: shape({
      init: func.isRequired,
      updateToken: func.isRequired,
      idToken: string,
      refreshToken: string,
      token: string,
      onReady: func,
      onAuthSuccess: func,
      onAuthError: func,
      onAuthRefreshSuccess: func,
      onAuthRefreshError: func,
      onAuthLogout: func,
      onTokenExpired: func
    }).isRequired,
    initConfig: shape({}),
    isLoadingCheck: func,
    LoadingComponent: element,
    onError: func,
    onEvent: func,
    onTokens: func
  };

  keycloakProvider.defaultProps = {
    initConfig: {
      onLoad: 'check-sso',
      promiseType: 'native'
    },
    isLoadingCheck: null,
    LoadingComponent: null,
    onError: null,
    onEvent: null,
    onTokens: null
  };

  return keycloakProvider;
};

export const KeycloakContext = createKeycloakContext();

const KeycloakProvider = createKeycloakProvider(KeycloakContext);

export default KeycloakProvider;
