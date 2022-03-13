import {createReducer} from '@reduxjs/toolkit';

import {
  setActiveGenre,
  incCountAction,
  resetCountAction,
  loadFilms,
  requireAuthorization,
  setError,
  loadPromoFilm,
  loadFilm,
  loadSimilarFilms,
  loadReviews,
  loadUserData,
  sendReview,
  setDataLoading
} from './action';

import {
  DEFAULT_ACTIVE_GENRE,
  FILM_CARDS_COUNT,
  FILM_CARDS_COUNT_STEP,
  AuthorizationStatus
} from '../const';

import {Film} from '../types/film';
import {Review} from '../types/review';
import {UserData} from '../types/user-data';

type InitialState = {
  activeGenre: string,
  film: Film | object,
  films: Film[],
  similarFilms: Film[],
  reviews: Review[],
  promoFilm: Film | object,
  filmCardsCount: number,
  authorizationStatus: AuthorizationStatus,
  userData: UserData | object,
  isDataLoaded: boolean,
  isDataSending: boolean,
  error: string,
}

const initialState: InitialState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  film: {},
  films: [],
  similarFilms: [],
  reviews: [],
  promoFilm: {},
  filmCardsCount: FILM_CARDS_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {},
  isDataLoaded: false,
  isDataSending: false,
  error: '',
};

const reducer = createReducer(initialState, (builder)=> {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(incCountAction, (state) => {
      state.filmCardsCount += FILM_CARDS_COUNT_STEP;
    })
    .addCase(resetCountAction, (state) => {
      state.filmCardsCount = FILM_CARDS_COUNT;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadFilm, (state, action) =>{
      state.film = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadUserData, (state, action) => {
      state.userData = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(sendReview, (state, action) => {
      state.isDataSending = action.payload;
    })
    .addCase(setDataLoading, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export {reducer};
