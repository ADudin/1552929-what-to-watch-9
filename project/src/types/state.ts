import {store} from '../store/store';
import {Film} from './film';
import {AuthorizationStatus} from '../const';

export type State = {
  activeGenre: string,
  films: Film[],
  promoFilm: Film | object,
  filmCardsCount: number,
  authorizationStatus: AuthorizationStatus,
  error: string,
  isDataLoaded: boolean,
};

export type AppDispatch = typeof store.dispatch;
