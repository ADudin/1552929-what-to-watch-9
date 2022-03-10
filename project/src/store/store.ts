import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../services/api';

export const store = configureStore({reducer});

export const api = createAPI();
