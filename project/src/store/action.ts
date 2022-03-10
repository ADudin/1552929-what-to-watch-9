import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {AuthorizationStatus} from '../const';

export const setActiveGenre = createAction<string>('main/setActiveGenre');

export const incCountAction = createAction('main/incCountAction');

export const resetCountAction = createAction('main/resetCountAction');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string>('main/setError');
