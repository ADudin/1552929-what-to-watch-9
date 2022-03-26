import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

import {makeFakeFilmData} from '../../utils/mock';
import FavoriteButtonComponent from './favorite-button-component';

const mockStore = configureMockStore();

describe('Component: FavoriteButtonComponent', () => {
  it('should render correctly', () => {
    const fakeFilm = makeFakeFilmData();

    render(
      <Provider store = {mockStore({})}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element = {<FavoriteButtonComponent id = {fakeFilm.id} isFavorite = {fakeFilm.isFavorite}/>}
            />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    const titleElement = screen.getByText('My list');

    expect(titleElement).toBeInTheDocument();
  });
});
