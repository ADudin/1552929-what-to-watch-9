import {Review} from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 14,
      name: 'Corey',
    },
    rating: 1.6,
    comment: 'I personally found this movie to be boring. Definitely one of the most boring movies I\'ve ever seen.',
    date: '2022-01-22T15:13:26.388Z',
  },
  {
    id: 2,
    user: {
      id: 13,
      name: 'Zak',
    },
    rating: 2.3,
    comment: 'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    date: '2022-02-06T21:48:13.678Z',
  },
  {
    id: 3,
    user: {
      id: 15,
      name: 'Kendall',
    },
    rating: 1.6,
    comment: 'Unfortunately we don\'t have a reliable way to tell the true ratings of a movie.',
    date: '2022-02-28T21:48:13.678Z',
  },
];
