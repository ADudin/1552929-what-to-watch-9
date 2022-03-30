import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';

import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchFilmsAction,
  fetchFilmAction,
  fetchSimilarFilmsAction,
  fetchFavoriteAction,
  fetchReviewsAction,
  fetchPromoFilmAction,
  fetchUserData
} from './api-actions';

import {loadUserData, requireAuthorization} from './user-process/user-process';
import {ApiRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';

import {
  makeFakeFilmData,
  makeFakeReview,
  makeFakeUserData
} from '../utils/mock';

import {
  loadFilms,
  loadFilm,
  loadSimilarFilms,
  loadFavorite,
  loadReviews,
  loadPromoFilm,
  sendReview,
  changeFavoriteStatus,
  setError
} from './film-data/film-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should update authorization status to "auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(ApiRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequiredAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: 'qwerty12345'};

    mockAPI
      .onPost(ApiRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(ApiRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('what-to-watch-token');
  });

  it('should dispatch loadFilms when GET /films', async () => {
    const fakeFilms = [makeFakeFilmData(), makeFakeFilmData()];

    mockAPI
      .onGet(ApiRoute.Films)
      .reply(200, fakeFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFilms.toString());
  });

  it('should dispatch loadFilm when GET /film/{filmId}', async () => {
    const fakeFilm = makeFakeFilmData();
    const filmId = fakeFilm.id;

    mockAPI
      .onGet(`${ApiRoute.Film}${filmId}`)
      .reply(200, fakeFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(filmId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFilm.toString());
  });

  it('should dispatch loadSimilarFilms when GET /films/{filmId}/similar', async () => {
    const fakeFilm = makeFakeFilmData();
    const filmId = fakeFilm.id;
    const fakeSimilarFilms = [makeFakeFilmData(), makeFakeFilmData()];

    mockAPI
      .onGet(`${ApiRoute.SimilarFilms}${filmId}/similar`)
      .reply(200, fakeSimilarFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction(filmId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadSimilarFilms.toString());
  });

  it('should dispatch loadFavorite when GET /favorite', async () => {
    const fakeFavoriteFilms = [makeFakeFilmData(), makeFakeFilmData()];

    mockAPI
      .onGet(ApiRoute.Favorite)
      .reply(200, fakeFavoriteFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavorite.toString());
  });

  it('should dispatch loadReviews when GET /comments/{filmId}', async () => {
    const fakeReviews = [makeFakeReview(), makeFakeReview()];
    const fakeFilm = makeFakeFilmData();
    const filmId = fakeFilm.id;

    mockAPI
      .onGet(`${ApiRoute.Comments}${filmId}`)
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(filmId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadReviews.toString());
  });

  it('should dispatch loadPromoFilm when GET /promo', async () => {
    const fakePromoFilm = makeFakeFilmData();

    mockAPI
      .onGet(ApiRoute.PromoFilm)
      .reply(200, fakePromoFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadPromoFilm.toString());
  });

  it('should dispatch loadUserData when GET /login', async () => {
    const fakeUserData = makeFakeUserData();

    mockAPI
      .onGet(ApiRoute.Login)
      .reply(200, fakeUserData);

    const store = mockStore();

    await store.dispatch(fetchUserData());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadUserData.toString());
  });

  it('should dispatch sendReview when POST /comments/{filmId}', async () => {
    const fakeFilm = makeFakeFilmData();
    const filmId = fakeFilm.id;
    const fakeNewReview = makeFakeReview();
    const comment = fakeNewReview.comment;
    const rating = fakeNewReview.rating;

    mockAPI
      .onPost(`${ApiRoute.Comments}${filmId}`, {comment, rating})
      .reply(200, fakeNewReview);

    const store = mockStore();

    await store.dispatch(sendReview(false));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(sendReview.toString());
  });

  it('should dispatch chengeFavoriteStatus when POST /favorite/{filmId}/{status}', async () => {
    const fakeFilm = makeFakeFilmData();
    const filmId = fakeFilm.id;
    const status = fakeFilm.isFavorite;

    mockAPI
      .onPost(`${ApiRoute.Favorite}/${filmId}/${status}`)
      .reply(200, fakeFilm);

    const store = mockStore();

    await store.dispatch(changeFavoriteStatus(false));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeFavoriteStatus.toString());
  });

  it('should dispatch clearError', async () => {
    const store = mockStore();

    await store.dispatch(setError(''));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setError.toString());
  });
});
