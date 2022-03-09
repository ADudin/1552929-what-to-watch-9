import {store} from '../store/store';
import {Film} from './film';

export type State = {
  activeGenre: string,
  films: Film[],
};

export type AppDispatch = typeof store.dispatch;
