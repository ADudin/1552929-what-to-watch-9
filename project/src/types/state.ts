import {store} from '../store/store';
import {Film} from './film';
import {Review} from './review';
import {UserData} from './user-data';
import {AuthorizationStatus} from '../const';

export type State = {
  activeGenre: string,
  film: Film | object,
  films: Film[],
  similarFilms: Film[],
  reviews: Review[],
  promoFilm: Film | object,
  filmCardsCount: number,
  authorizationStatus: AuthorizationStatus,
  userData: UserData | object,
  error: string,
  isDataLoaded: boolean,
};

export type AppDispatch = typeof store.dispatch;
