import {Comment} from '../types/comment';

export const comments: Comment[] = [
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
];

export type Comments = Comment[];