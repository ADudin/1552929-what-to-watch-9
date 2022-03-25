import {filmData} from './film-data';

import {
  loadFilms,
  setError,
  loadPromoFilm,
  loadFilm,
  loadSimilarFilms,
  loadFavorite,
  changeFavoriteStatus,
  loadReviews,
  sendReview
} from './film-data';

import {
  makeFakeFilmData,
  makeFakeMessage,
  makeFakeReview
} from '../../utils/mock';

const fakeFilm = makeFakeFilmData();
const fakeFilms = [makeFakeFilmData(), makeFakeFilmData()];
const fakeError = makeFakeMessage();
const fakeReviews = [makeFakeReview(), makeFakeReview()];

const initialState = {
  film: {},
  films: [],
  similarFilms: [],
  favorite: [],
  reviews: [],
  promoFilm: {},
  isDataLoaded: false,
  isDataSending: false,
  error: '',
};

describe('Reducer: filmData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update film by load film', () => {
    expect(filmData.reducer(initialState, loadFilm(fakeFilm)))
      .toEqual({
        film: fakeFilm,
        films: [],
        similarFilms: [],
        favorite: [],
        reviews: [],
        promoFilm: {},
        isDataLoaded: false,
        isDataSending: false,
        error: '',
      });
  });

  it('should update promoFilm by load promoFilm', () => {
    expect(filmData.reducer(initialState, loadPromoFilm(fakeFilm)))
      .toEqual({
        film: {},
        films: [],
        similarFilms: [],
        favorite: [],
        reviews: [],
        promoFilm: fakeFilm,
        isDataLoaded: false,
        isDataSending: false,
        error: '',
      });
  });

  it('should update films by load films', () => {
    expect(filmData.reducer(initialState, loadFilms(fakeFilms)))
      .toEqual({
        film: {},
        films: fakeFilms,
        similarFilms: [],
        favorite: [],
        reviews: [],
        promoFilm: {},
        isDataLoaded: true,
        isDataSending: false,
        error: '',
      });
  });

  it('should update similarFilms by load similar films', () => {
    expect(filmData.reducer(initialState, loadSimilarFilms(fakeFilms)))
      .toEqual({
        film: {},
        films: [],
        similarFilms: fakeFilms,
        favorite: [],
        reviews: [],
        promoFilm: {},
        isDataLoaded: false,
        isDataSending: false,
        error: '',
      });
  });

  it('should update favorite by load favorite films', () => {
    expect(filmData.reducer(initialState, loadFavorite(fakeFilms)))
      .toEqual({
        film: {},
        films: [],
        similarFilms: [],
        favorite: fakeFilms,
        reviews: [],
        promoFilm: {},
        isDataLoaded: false,
        isDataSending: false,
        error: '',
      });
  });

  it('should change favorite status', () => {
    const state = {
      film: fakeFilm,
      films: [],
      similarFilms: [],
      favorite: [],
      reviews: [],
      promoFilm: {},
      isDataLoaded: false,
      isDataSending: true,
      error: '',
    };

    expect(filmData.reducer(state, changeFavoriteStatus(false)))
      .toEqual({
        film: fakeFilm,
        films: [],
        similarFilms: [],
        favorite: [],
        reviews: [],
        promoFilm: {},
        isDataLoaded: false,
        isDataSending: false,
        error: '',
      });
  });

  it('should update error by load error', () => {
    expect(filmData.reducer(initialState, setError(fakeError)))
      .toEqual({
        film: {},
        films: [],
        similarFilms: [],
        favorite: [],
        reviews: [],
        promoFilm: {},
        isDataLoaded: false,
        isDataSending: false,
        error: fakeError,
      });
  });

  it('should update isDataSending state by send review', () => {
    const state = {
      film: {},
      films: [],
      similarFilms: [],
      favorite: [],
      reviews: [],
      promoFilm: {},
      isDataLoaded: false,
      isDataSending: true,
      error: '',
    };

    expect(filmData.reducer(state, sendReview(false)))
      .toEqual({
        film: {},
        films: [],
        similarFilms: [],
        favorite: [],
        reviews: [],
        promoFilm: {},
        isDataLoaded: false,
        isDataSending: false,
        error: '',
      });
  });

  it('should update reviews by load reviews', () => {
    expect(filmData.reducer(initialState, loadReviews(fakeReviews)))
      .toEqual({
        film: {},
        films: [],
        similarFilms: [],
        favorite: [],
        reviews: fakeReviews,
        promoFilm: {},
        isDataLoaded: false,
        isDataSending: false,
        error: '',
      });
  });
});
