import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  FILM_CARDS_COUNT: 20,
  promoFilmCard: {
    name: 'The Grand Budapest Hotel',
    genre: 'Drama',
    released: 2014,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <App
      filmCardsCount={Setting.FILM_CARDS_COUNT}
      promoFilmCard={Setting.promoFilmCard}
    />
  </React.StrictMode>,
  document.getElementById('root'));
