import {createReducer} from '@reduxjs/toolkit';
import {
  setActiveGenre,
  incCountAction,
  resetCountAction,
  loadFilms,
  requireAuthorization
} from './action';
//import {films as filmItems} from '../mocks/films';
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
  filmCardsCount: number,
  authorizationStatus: AuthorizationStatus,
}

const initialState: InitialState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  //films: filmItems,
  films: [],
  filmCardsCount: FILM_CARDS_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder)=> {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
      //state.films = state.activeGenre === DEFAULT_ACTIVE_GENRE ? [...filmItems] : [...filmItems].filter((film) => film.genre === state.activeGenre);
    })
    .addCase(incCountAction, (state) => {
      state.filmCardsCount += FILM_CARDS_COUNT_STEP;
    })
    .addCase(resetCountAction, (state) => {
      state.filmCardsCount = FILM_CARDS_COUNT;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = state.activeGenre === DEFAULT_ACTIVE_GENRE ? action.payload : action.payload.filter((film) => film.genre === state.activeGenre);
      //state.films = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
