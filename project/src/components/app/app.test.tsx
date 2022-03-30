import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {makeFakeFilmData, makeFakeReview, makeFakeUserData} from '../../utils/mock';

import {
  AuthorizationStatus,
  AppRoute,
  DEFAULT_ACTIVE_GENRE,
  FILM_CARDS_COUNT
} from '../../const';

import App from './app';

const mockStore = configureMockStore();
const films = [makeFakeFilmData(), makeFakeFilmData()];

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: makeFakeUserData(),
  },
  DATA: {
    films: films,
    film: makeFakeFilmData(),
    similarFilms: [makeFakeFilmData(), makeFakeFilmData()],
    favorite: [makeFakeFilmData(), makeFakeFilmData()],
    reviews: [makeFakeReview(), makeFakeReview()],
    promoFilm: makeFakeFilmData(),
    isDataSending: false,
    isDataLoaded: true,
    error: '',
  },
  FILM: {
    activeGenre: DEFAULT_ACTIVE_GENRE,
    filmCardsCount: FILM_CARDS_COUNT,
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
