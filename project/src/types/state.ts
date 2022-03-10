import {store} from '../store/store';
import {Film} from './film';
import {AuthorizationStatus} from '../const';

export type State = {
  activeGenre: string,
  films: Film[],
  filmCardsCount: number,
  authorizationStatus: AuthorizationStatus,
};

export type AppDispatch = typeof store.dispatch;
