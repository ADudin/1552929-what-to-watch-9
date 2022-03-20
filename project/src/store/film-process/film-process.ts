import {createSlice} from '@reduxjs/toolkit';

import {
  NameSpace,
  DEFAULT_ACTIVE_GENRE,
  FILM_CARDS_COUNT,
  FILM_CARDS_COUNT_STEP
} from '../../const';

import {FilmProcess} from '../../types/state';

const initialState: FilmProcess = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  filmCardsCount: FILM_CARDS_COUNT,
};

export const filmProcess = createSlice({
  name: NameSpace.film,
  initialState,
  reducers: {
    setActiveGenre: (state, action) => {
      state.activeGenre = action.payload;
    },
    incCountAction: (state) => {
      state.filmCardsCount += FILM_CARDS_COUNT_STEP;
    },
    resetCountAction: (state) => {
      state.filmCardsCount = FILM_CARDS_COUNT;
    },
  },
});

export const {
  setActiveGenre,
  incCountAction,
  resetCountAction,
} = filmProcess.actions;
