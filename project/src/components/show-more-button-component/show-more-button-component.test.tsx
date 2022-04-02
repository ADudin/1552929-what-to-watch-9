import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import ShowMoreButtonComponent from './show-more-button-component';
import {FILM_CARDS_COUNT} from '../../const';

const mockStore = configureMockStore();

describe('Component: ShowMoreButtonComponent', () => {
  it('should render correctly', () => {

    render(
      <Provider store = {mockStore({FILM: {filmcardsCount: FILM_CARDS_COUNT}})}>
        <ShowMoreButtonComponent />
      </Provider>,
    );

    const titleElement = screen.getByText('Show more');

    expect(titleElement).toBeInTheDocument();
  });
});
