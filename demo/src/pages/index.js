// @flow
import React, { lazy, Suspense } from 'react';
import { shape, arrayOf, string, bool, object } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useKeycloak } from '@ksakira10/react-keycloak-js';
import Fallback from '../shared/components/Fallback';
import PrivateRoute from '../shared/components/PrivateRoute';
import Layout from '../shared/components/Layout';

const Pages = ({ history, routes }) => {
  const [, initialized] = useKeycloak();

  if (!initialized) {
    return <Fallback />;
  }

  return (
    <BrowserRouter history={history}>
      <Layout>
        <Switch>
          <Suspense fallback={<Fallback />}>
            {routes.map(({ path, exact, component, isAuth }) =>
              isAuth == null ? (
                <Route
                  path={path}
                  exact={exact}
                  component={component}
                  key={path}
                />
              ) : (
                <PrivateRoute
                  path={path}
                  exact={exact}
                  component={component}
                  key={path}
                />
              )
            )}
          </Suspense>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

Pages.propTypes = {
  history: shape({}),
  routes: arrayOf(
    shape({
      path: string,
      exact: bool,
      isAuth: bool,
      component: object
    })
  )
};

Pages.defaultProps = {
  routes: [
    {
      path: '/',
      exact: true,
      component: lazy(() => import('./Home'))
    },
    {
      path: '/login',
      exact: true,
      component: lazy(() => import('./Login'))
    },
    {
      path: '/domain',
      exact: true,
      isAuth: true,
      component: lazy(() => import('./Domain'))
    }
  ]
};

export default connect(({ history }) => ({ history }))(Pages);
