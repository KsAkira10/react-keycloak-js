import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ProtectedRoute from '../shared/components/ProtectedRoute';
import Home from './Home';
import About from './About';
import Login from './Login';
import Dashboard from './Dashboard';

const Pages = () => (
  <BrowserRouter>
    <Route path='/'>
      <Home />
    </Route>
    <Route path='/about'>
      <About />
    </Route>
    <Route path='/login'>
      <Login />
    </Route>
    <ProtectedRoute path='/dashboard'>
      <Dashboard />
    </ProtectedRoute>
    <ul>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
  </BrowserRouter>
);

export default Pages;
