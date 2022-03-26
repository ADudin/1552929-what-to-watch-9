import {render, screen} from '@testing-library/react';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

import NotFoundComponent from './not-found-component';

describe('Component: NotFoundComponent', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element = {<NotFoundComponent />}
          />
        </Routes>
      </BrowserRouter>,
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Go to main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
