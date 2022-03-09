import {createReducer} from '@reduxjs/toolkit';
import {
  setActiveGenre,
  incCountAction,
  resetCountAction
} from './action';
import {films} from '../mocks/films';
import {
  DEFAULT_ACTIVE_GENRE,
  FILM_CARDS_COUNT,
  FILM_CARDS_COUNT_STEP
} from '../const';

const initialState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  films: films,
  filmCardsCount: FILM_CARDS_COUNT,
};

const reducer = createReducer(initialState, (builder)=> {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
      state.films = state.activeGenre === DEFAULT_ACTIVE_GENRE ? [...films] : [...films].filter((film) => film.genre === state.activeGenre);
    })
    .addCase(incCountAction, (state) => {
      state.filmCardsCount += FILM_CARDS_COUNT_STEP;
    })
    .addCase(resetCountAction, (state) => {
      state.filmCardsCount = FILM_CARDS_COUNT;
    });
});

export {reducer};
