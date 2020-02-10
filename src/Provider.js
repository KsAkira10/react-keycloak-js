import React, { useState, useCallback, useEffect } from 'react';
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

  const KeycloakProvider = ({
    children,
    initConfig,
    keycloak,
    LoadingComponent,
    onEvent,
    onTokens,
    isLoadingCheck
  }) => {
    const [state, setState] = useState({ ...initialState });
    const resetState = useCallback(() => setState({ ...initialState }), [
      initialState
    ]);

    const init = () => {
      keycloak.onReady = updateState('onReady');
      keycloak.onAuthSuccess = updateState('onAuthSuccess');
      keycloak.onAuthError = onKeycloakError('onAuthError');
      keycloak.onAuthRefreshSuccess = updateState('onAuthRefreshSuccess');
      keycloak.onAuthRefreshError = onKeycloakError('onAuthRefreshError');
      keycloak.onAuthLogout = updateState('onAuthLogout');
      keycloak.onTokenExpired = refreshKeycloakToken('onTokenExpired');

      keycloak.init({ ...defaultInitConfig, ...initConfig });
    };

    const onKeycloakError = event => error => {
      return onEvent && onEvent(event, error);
    };

    const updateState = event => () => {
      const {
        initialized: prevInitialized,
        isLoading: prevLoading,
        token: prevToken
      } = state;
      const { idToken, refreshToken, token: newToken } = keycloak;

      onEvent && onEvent(event);

      const isLoading = isLoadingCheck ? isLoadingCheck(keycloak) : false;

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
      keycloak.updateToken(5);
    };

    useEffect(() => {
      if (!state.initialized) {
        init();
      }

      return () => {
        keycloak.onReady = undefined;
        keycloak.onAuthSuccess = undefined;
        keycloak.onAuthError = undefined;
        keycloak.onAuthRefreshSuccess = undefined;
        keycloak.onAuthRefreshError = undefined;
        keycloak.onAuthLogout = undefined;
        keycloak.onTokenExpired = undefined;

        resetState();

        init();
      };
    }, [keycloak, initConfig]);

    if (!!LoadingComponent && (!state.initialized || state.isLoading)) {
      return LoadingComponent;
    }

    return (
      <KeycloakContext.Provider
        value={{ initialized: state.initialized, keycloak }}
      >
        {children}
      </KeycloakContext.Provider>
    );
  };

  KeycloakProvider.propTypes = {
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
  KeycloakProvider.defaultProps = {
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

  return KeycloakProvider;
};

export const KeycloakContext = createKeycloakContext();

const KeycloakProvider = createKeycloakProvider(KeycloakContext);

export default KeycloakProvider;
