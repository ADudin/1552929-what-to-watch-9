import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

import ErrorMessage from './error-message';

const mockStore = configureMockStore();

describe('Component: ErrorMessage', () => {
  it('should render correctly', () => {

    render(
      <Provider store = {mockStore({DATA: {error: 'error test'}})}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element = {<ErrorMessage />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
