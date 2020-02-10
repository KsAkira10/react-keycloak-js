// @flow
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
import { withKeycloak } from '@ksakira10/react-keycloak-js';

const Container = styled.main`
  width: 100%;
  height: auto;
`;

const Login = withRouter(
  withKeycloak(({ keycloak, location }) => {
    const { from } = location.state || { from: { pathname: '/domain' } };
    if (keycloak.authenticated) return <Redirect to={from} />;

    const login = useCallback(keycloak.login, [keycloak]);

    return (
      <Container>
        <h2>Login</h2>
        <button type="button" onClick={login}>
          Login
        </button>
      </Container>
    );
  }),
);

export default Login;
