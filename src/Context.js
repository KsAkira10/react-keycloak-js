import React from 'react';

const createKeycloakContext = initialContext =>
  React.createContext({
    initialized: false,
    ...initialContext
  });

export default createKeycloakContext;
