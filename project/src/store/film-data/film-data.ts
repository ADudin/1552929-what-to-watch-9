import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmData} from '../../types/state';

const initialState: FilmData = {
  film: {},
  films: [],
  similarFilms: [],
  favorite: [],
  reviews: [],
  promoFilm: {},
  isDataLoaded: false,
  isDataSending: false,
  error: '',
  isLoadingError: false,
  isReviewDataSent: false,
};

export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadFilms: (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoadingError: (state, action) => {
      state.isLoadingError = action.payload;
    },
    setReviewDataSent: (state, action) => {
      state.isReviewDataSent = action.payload;
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
    loadFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    changeFavoriteStatus: (state, action) => {
      state.isDataSending = action.payload;
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
  loadFavorite,
  changeFavoriteStatus,
  loadReviews,
  sendReview,
  setLoadingError,
  setReviewDataSent,
} = filmData.actions;
