import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {Review} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthorizationStatus} from '../const';

export const setActiveGenre = createAction<string>('main/setActiveGenre');

export const incCountAction = createAction('main/incCountAction');

export const resetCountAction = createAction('main/resetCountAction');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const loadSimilarFilms = createAction<Film[]>('data/loadSumilarFilms');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const loadFilm = createAction<Film>('data/loadFilm');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string>('main/setError');

export const loadUserData = createAction<UserData>('data/loadUserData');
