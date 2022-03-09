import {createAction} from '@reduxjs/toolkit';

export const setActiveGenre = createAction<string>('main/setActiveGenre');

export const incCountAction = createAction('main/incCountAction');

export const resetCountAction = createAction('main/resetCountAction');
