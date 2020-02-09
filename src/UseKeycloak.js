import { useContext } from 'react';

import { KeycloakContext } from './Provider';

const useKeycloak = () => {
  const { initialized, keycloak } = useContext(KeycloakContext);
  return Object.assign([keycloak, initialized], { initialized, keycloak });
};

export default useKeycloak;
