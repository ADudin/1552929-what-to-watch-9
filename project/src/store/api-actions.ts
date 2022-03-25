import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  AppDispatch,
  State
} from '../types/state';

/*import {
  api,
  store
} from '../store/store';*/

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
} from './film-data/film-data';

import {
  requireAuthorization,
  loadUserData
} from './user-process/user-process';

import {
  saveToken,
  dropToken
} from '../services/token';

import {errorHandle} from '../services/error-handle';

import {
  APIRoute,
  AuthorizationStatus,
  TIMEOUT_SHOW_ERROR
} from '../const';

import {Film} from '../types/film';
import {Review} from '../types/review';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {NewReview} from '../types/new-review';

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'main/clearError',
  (_arg, {dispatch}) => {
    setTimeout(
      () => dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilm',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Film}${filmId}`);
      dispatch(loadFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Films);
      dispatch(loadFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilms',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(`${APIRoute.SimilarFilms}${filmId}/similar`);
      dispatch(loadSimilarFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoriteAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Favorite);
      dispatch(loadFavorite(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}${filmId}`);
      dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(APIRoute.PromoFilm);
      dispatch(loadPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user.logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchUserData = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchUserData',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(loadUserData(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const sendNewReviewAction = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/sendNewReview',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    try {
      await api.post<NewReview>(`${APIRoute.Comments}${filmId}`, {comment, rating});
      dispatch(sendReview(false));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<void,{filmId: number, status: number}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changeFavoriteFilmStatus',
  async ({filmId, status}, {dispatch, extra: api}) => {
    try {
      await api.post<Film>(`${APIRoute.Favorite}/${filmId}/${status}`);
      dispatch(fetchPromoFilmAction());
      dispatch(fetchFilmAction(filmId));
      dispatch(changeFavoriteStatus(false));
    } catch (error) {
      errorHandle(error);
    }
  },
);
