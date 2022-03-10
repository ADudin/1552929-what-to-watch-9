import {createReducer} from '@reduxjs/toolkit';
import {
  setActiveGenre,
  incCountAction,
  resetCountAction,
  loadFilms,
  requireAuthorization,
  setError,
  loadPromoFilm
} from './action';

import {
  DEFAULT_ACTIVE_GENRE,
  FILM_CARDS_COUNT,
  FILM_CARDS_COUNT_STEP,
  AuthorizationStatus
} from '../const';
import {Film} from '../types/film';

type InitialState = {
  activeGenre: string,
  films: Film[],
  promoFilm: Film | object,
  filmCardsCount: number,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string,
}

const initialState: InitialState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  films: [],
  promoFilm: {},
  filmCardsCount: FILM_CARDS_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
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
    });
});

export {reducer};
