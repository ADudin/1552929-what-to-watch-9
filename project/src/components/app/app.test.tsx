import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {makeFakeFilmData} from '../../utils/mock';

import {
  AuthorizationStatus,
  AppRoute
} from '../../const';

import App from './app';

const mockStore = configureMockStore();
const films = [makeFakeFilmData(), makeFakeFilmData()];

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {
    films: films,
    isDataLoaded: true,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store = {store}>
    <HistoryRouter history = {history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render MainComponent when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });
});
