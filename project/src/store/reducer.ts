import {createReducer} from '@reduxjs/toolkit';
import {setActiveGenre} from './action';
import {films} from '../mocks/films';
import {DEFAULT_ACTIVE_GENRE} from '../const';

const initialState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  films: films,
};

const reducer = createReducer(initialState, (builder)=> {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
      state.films = state.activeGenre === DEFAULT_ACTIVE_GENRE ? [...films] : [...films].filter((film) => film.genre === state.activeGenre);
    });
});

export {reducer};
