import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmData} from '../../types/state';

const initialState: FilmData = {
  film: {},
  films: [],
  similarFilms: [],
  reviews: [],
  promoFilm: {},
  isDataLoaded: false,
  isDataSending: false,
  error: '',
};

export const filmData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadFilms: (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loadPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    loadFilm: (state, action) => {
      state.film = action.payload;
    },
    loadSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    sendReview: (state, action) => {
      state.isDataSending = action.payload;
    },
  },
});

export const {
  loadFilms,
  setError,
  loadPromoFilm,
  loadFilm,
  loadSimilarFilms,
  loadReviews,
  sendReview,
} = filmData.actions;
