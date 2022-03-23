import {filmProcess} from './film-process';

import {
  setActiveGenre,
  incCountAction,
  resetCountAction
} from './film-process';

import {
  DEFAULT_ACTIVE_GENRE,
  FILM_CARDS_COUNT,
  FILM_CARDS_COUNT_STEP
} from '../../const';

const INCREMENTED_FILM_CARDS_COUNT = FILM_CARDS_COUNT + FILM_CARDS_COUNT_STEP;

describe('Reducer: filmProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({activeGenre: DEFAULT_ACTIVE_GENRE, filmCardsCount: FILM_CARDS_COUNT});
  });

  it('should increment filmCardsCount by a given value', () => {
    const state = {activeGenre: DEFAULT_ACTIVE_GENRE, filmCardsCount: FILM_CARDS_COUNT};
    expect(filmProcess.reducer(state, incCountAction()))
      .toEqual({activeGenre: DEFAULT_ACTIVE_GENRE, filmCardsCount: INCREMENTED_FILM_CARDS_COUNT});
  });

  it('should reduce filmCardsCount to FILM_CARDS_COUNT', () => {
    expect(filmProcess.reducer({activeGenre: DEFAULT_ACTIVE_GENRE, filmCardsCount: INCREMENTED_FILM_CARDS_COUNT}, resetCountAction()))
      .toEqual({activeGenre: DEFAULT_ACTIVE_GENRE, filmCardsCount: FILM_CARDS_COUNT});

    expect(filmProcess.reducer({activeGenre: DEFAULT_ACTIVE_GENRE, filmCardsCount: FILM_CARDS_COUNT}, resetCountAction()))
      .toEqual({activeGenre: DEFAULT_ACTIVE_GENRE, filmCardsCount: FILM_CARDS_COUNT});
  });

  it('should change value of activeGenre', () => {
    const state =  {activeGenre: DEFAULT_ACTIVE_GENRE, filmCardsCount: FILM_CARDS_COUNT};
    expect(filmProcess.reducer(state, setActiveGenre('Comedy')))
      .toEqual({activeGenre: 'Comedy', filmCardsCount: FILM_CARDS_COUNT});
  });
});
