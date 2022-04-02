import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {
  Route,
  Routes
} from 'react-router-dom';

import PrivateRoute from './private-route';

import {
  AppRoute,
  AuthorizationStatus
} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivatRouteComponent', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route, when user not authrized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    render(
      <Provider store = {store}>
        <HistoryRouter history = {history}>
          <Routes>
            <Route
              path = {AppRoute.SignIn}
              element = {<h1>Public Route</h1>}
            />
            <Route
              path = '/private'
              element = {
                <PrivateRoute authorizationStatus = {AuthorizationStatus.NoAuth}>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store = {store}>
        <HistoryRouter history = {history}>
          <Routes>
            <Route
              path = {AppRoute.SignIn}
              element = {<h1>Public Route</h1>}
            />
            <Route
              path = '/private'
              element = {
                <PrivateRoute authorizationStatus = {AuthorizationStatus.Auth}>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
