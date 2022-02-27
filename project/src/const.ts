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
