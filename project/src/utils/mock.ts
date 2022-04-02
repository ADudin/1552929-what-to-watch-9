import {
  name,
  internet,
  date,
  lorem,
  image,
  datatype
} from 'faker';

import {UserData} from '../types/user-data';
import {Film} from '../types/film';
import {Review} from '../types/review';

const getRandomInteger = (): number => {
  const randomInteger = Math.ceil(Math.random() * 100);

  return randomInteger;
};

export const makeFakeUserData = (): UserData => ({
  id: getRandomInteger(),
  email: internet.email(),
  name: name.findName(),
  avatarUrl: internet.avatar(),
  token: internet.password(),
} as UserData);

export const makeFakeFilmData = (): Film => ({
  id: getRandomInteger(),
  name: lorem.word(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: lorem.text(),
  rating: getRandomInteger(),
  scoresCount: getRandomInteger(),
  director: name.findName(),
  starring: new Array(4).fill(null).map(() => name.findName()),
  runTime: getRandomInteger(),
  genre: lorem.word(),
  released: date.past().getFullYear(),
  isFavorite: datatype.boolean(),
} as Film);

export const makeFakeMessage = (): string => {
  const message = lorem.sentences();

  return message;
};

export const makeFakeReview = (): Review => ({
  comment: lorem.text(),
  date: date.past().toDateString(),
  id: getRandomInteger(),
  rating: getRandomInteger(),
  user: {
    id: getRandomInteger(),
    name: name.findName(),
  },
} as Review);
