// @flow
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { domainAction } from '../../store/ducks/example';
import { shape, func } from 'prop-types';

const Container = styled.main`
  width: 100%;
  height: auto;
`;

const Domain = ({ DomainAction }) => {
  const { keycloak } = useKeycloak();
  const [profile, setProfile] = useState(null);
  const setUserProfile = useCallback(async (user) => setProfile(await user), []);
  useEffect(() => {
    try {
      setUserProfile(keycloak.loadUserProfile());
      DomainAction();
    } catch (error) {
      throw new Error(error);
    }
  }, [keycloak, setUserProfile, DomainAction]);
  return (
    <Container>
      <h2>Domain</h2>
      <div>User is {!keycloak.authenticated ? 'NOT ' : ''} authenticated</div>
      <pre>
        <code>{profile && JSON.stringify(profile, null, '   ')}</code>
      </pre>
      {!!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}
    </Container>
  );
};

Domain.propTypes = {
  history: shape({}),
  DomainAction: func,
};

export default connect(({ history }) => ({ history }), { DomainAction: domainAction })(Domain);
