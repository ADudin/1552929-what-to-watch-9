import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {films} from './mocks/films';
import {reviews} from './mocks/reviews';

const Setting = {
  promoFilmCard: {
    name: 'The Grand Budapest Hotel',
    genre: 'Drama',
    released: 2014,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <App
      promoFilmCard = {Setting.promoFilmCard}
      films = {films}
      reviews = {reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
