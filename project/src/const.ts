import {RatingValue} from './types/rating-value';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = 'player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATING_VALUES: RatingValue[] = [
  {
    'value': 10,
  },
  {
    'value': 9,
  },
  {
    'value': 8,
  },
  {
    'value': 7,
  },
  {
    'value': 6,
  },
  {
    'value': 5,
  },
  {
    'value': 4,
  },
  {
    'value': 3,
  },
  {
    'value': 2,
  },
  {
    'value': 1,
  },
];

export const DEFAULT_ACTIVE_GENRE = 'All genres';

export const FILM_CARDS_COUNT = 8;

export const FILM_CARDS_COUNT_STEP = 8;

export const MAX_GENRES_COUNT = 9;

export enum ApiRoute {
  Films = '/films',
  Film = '/films/',
  SimilarFilms = '/films/',
  PromoFilm = '/promo',
  Favorite = '/favorite',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout',
}

export const TIMEOUT_SHOW_ERROR = 5000;

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum TextRating {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

export enum NameSpace {
  Data = 'DATA',
  Film = 'FILM',
  User = 'USER',
}

export const LOADING_ERROR_MESSAGE = 'Sorry, can\'t get data from server';

export const MIN_USER_COMMENT_SYMBOLS_COUNT = 50;

export const MAX_USER_COMMENT_SYMBOLS_COUNT = 400;
