import { LinearProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from 'utils/protected-route';
import { ROUTES } from './constants';
import Layout from './layouts/main-layout';
import LoginBasic from './pages/auth/Login';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.LOGIN} component={LoginBasic} />
        <ProtectedRoute
          render={props => (
            <Layout {...props}>
              <Suspense fallback={<LinearProgress />}>
                <Switch>
                  <Route
                    exact
                    path={ROUTES.CREATE_SHIFT}
                    component={lazy(() => import('./pages/Shift/ShiftCreate'))}
                  />

                  <Route
                    exact
                    path={ROUTES.USERS}
                    component={lazy(() => import('./pages/User/UserList'))}
                  />
                  <Route
                    exact
                    path={ROUTES.CREATE_USER}
                    component={lazy(() => import('./pages/User/UserCreate'))}
                  />
                  <Route
                    exact
                    path={ROUTES.CALENDAR}
                    component={lazy(() => import('./pages/Calendar'))}
                  />
                  <Route
                    exact
                    path={ROUTES.SUMMARY}
                    component={lazy(() => import('./pages/Summary'))}
                  />
                  <Route path={ROUTES.NOT_FOUND} component={NotFound} />
                  <Route
                    exact
                    path={ROUTES.HOME}
                    component={lazy(() => import('./pages/Shift/ShiftList'))}
                  />

                  <Redirect from={'*'} to={ROUTES.NOT_FOUND} exact />
                </Switch>
              </Suspense>
            </Layout>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
