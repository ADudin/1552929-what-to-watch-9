import {store} from '../store/store';
import {Film} from './film';
import {Review} from './review';
import {UserData} from './user-data';
import {AuthorizationStatus} from '../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData | object,
};

export type FilmProcess = {
  activeGenre: string,
  filmCardsCount: number,
};

export type FilmData = {
  film: Film | object,
  films: Film[],
  similarFilms: Film[],
  favorite: Film[],
  reviews: Review[],
  promoFilm: Film | object,
  error: string,
  isDataLoaded: boolean,
  isDataSending: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
