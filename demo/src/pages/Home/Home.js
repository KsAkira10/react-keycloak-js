// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.main`
  width: 100%;
  height: auto;
`;

const Home = () => (
  <Container>
    <h2>Home</h2>
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </Container>
);

export default Home;
