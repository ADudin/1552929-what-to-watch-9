import {store} from '../store/index';
import {Film} from './film';

export type State = {
  activeGenre: string,
  films: Film[],
};

export type AppDispatch = typeof store.dispatch;
