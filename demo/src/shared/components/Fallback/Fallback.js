// @flow
import React from 'react';
import { string, element } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background: #000;
  display: 'flex';
  justify-content: center;
  align-items: center;
`;

const Fallback = ({ className, children }) => (
  <Container className={className}>{children}</Container>
);

Fallback.propTypes = {
  className: string,
  children: element,
};

Fallback.defaultProps = {
  className: '',
};

export default Fallback;
