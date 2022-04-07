import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import {
  render,
  screen
} from '@testing-library/react';

import {configureMockStore} from '@jedmao/redux-mock-store';

import {
  AuthorizationStatus,
  AppRoute,
  NameSpace,
  DEFAULT_ACTIVE_GENRE,
  FILM_CARDS_COUNT
} from '../../const';

import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';

import {
  makeFakeFilmData,
  makeFakeReview,
  makeFakeUserData
} from '../../utils/mock';

import App from './app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeFilm = makeFakeFilmData();
const fakeFilms = [makeFakeFilmData(), makeFakeFilmData()];
const fakeReviews = [makeFakeReview(), makeFakeReview()];
const fakeUserData = makeFakeUserData();

const store = mockStore({
  [NameSpace.Data]: {
    film: fakeFilm,
    films: fakeFilms,
    similarFilms: fakeFilms,
    favorite: fakeFilms,
    reviews: fakeReviews,
    promoFilm: fakeFilm,
    isDataLoaded: true,
    isDataSending: false,
    error: '',
    isLoadingError: false,
    isReviewDataSent: false,
  },
  [NameSpace.Film]: {
    activeGenre: DEFAULT_ACTIVE_GENRE,
    filmCardsCount: FILM_CARDS_COUNT,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: fakeUserData,
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

const storeForMyListAndAddReviewPagesTest = mockStore({
  [NameSpace.Data]: {
    film: fakeFilm,
    films: fakeFilms,
    similarFilms: fakeFilms,
    favorite: fakeFilms,
    reviews: fakeReviews,
    promoFilm: fakeFilm,
    isDataLoaded: true,
    isDataSending: false,
    error: '',
    isLoadingError: false,
    isReviewDataSent: false,
  },
  [NameSpace.Film]: {
    activeGenre: DEFAULT_ACTIVE_GENRE,
    filmCardsCount: FILM_CARDS_COUNT,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
});

const fakeAppForMyListAndAddReviewPageTest = (
  <Provider store = {storeForMyListAndAddReviewPagesTest}>
    <HistoryRouter history = {history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application routing', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    const mainContent = screen.getByTestId('main-content');
    const promoFilmComponent = screen.getByTestId('promo-film');
    const playButton = screen.getByText('Play');
    const favoriteButton = screen.getByText('My list');

    expect(mainContent).toBeInTheDocument();
    expect(promoFilmComponent).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it('should render "SignInPage" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    const signInForm = screen.getByTestId('sign-in__form');
    const emailInputElement = screen.getByPlaceholderText('Email address');
    const passwordInputElement = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button');

    expect(signInForm).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Sign in');
  });

  it('should render "MyListPage" when user navigate to "/favorite"', () => {

    history.push(AppRoute.MyList);

    render(fakeAppForMyListAndAddReviewPageTest);

    const favoriteList = screen.getByTestId('favorite-list');

    expect(favoriteList).toBeInTheDocument();
  });

  it('should render "MoviePage" when user navigate to "/films/{filmId}"', () => {
    history.push(`/films/${fakeFilm.id}`);

    render(fakeApp);

    const moviePage = screen.getByTestId('movie-page');

    expect(moviePage).toBeInTheDocument();
  });

  it('should render "AddReviewPage" when user navigate to "/films/{filmId}/review"', () => {
    history.push(`/films/${fakeFilm.id}/review`);

    render(fakeAppForMyListAndAddReviewPageTest);

    const addReviewPage = screen.getByTestId('add-review-page');

    expect(addReviewPage).toBeInTheDocument();
  });

  it('should render "PlayerPage" when user navigate to "/player/{filmId}"', () => {
    history.push(`/player/${fakeFilm.id}`);

    render(fakeApp);

    const playerPage = screen.getByTestId('player-page');

    expect(playerPage).toBeInTheDocument();
  });

  it('should render "NotFoundComponent" when user navigate to wrong page', () => {
    history.push('/*');

    render(fakeApp);

    const notFoundComponent = screen.getByTestId('not-found-component');

    expect(notFoundComponent).toBeInTheDocument();
  });
});
