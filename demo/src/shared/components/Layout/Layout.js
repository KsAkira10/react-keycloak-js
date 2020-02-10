// @flow
import React from 'react';
import { element } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
`;

const Header = styled.header`
  width: 100%;
  height: auto;
`;

const Nav = styled.nav`
  width: 100%;
  height: auto;
`;

const Layout = ({ children }) => (
  <LayoutContainer>
    <Header>
      <Nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/domain">Domain</Link>
          </li>
        </ul>
      </Nav>
    </Header>
    {children}
  </LayoutContainer>
);

Layout.propTypes = {
  children: element.isRequired,
};

export default Layout;
