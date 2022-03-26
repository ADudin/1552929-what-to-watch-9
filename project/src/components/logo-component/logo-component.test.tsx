import {render, screen} from '@testing-library/react';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

import LogoComponent from './logo-component';

describe('Component: LogoComponent', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element = {<LogoComponent />}
          />
        </Routes>
      </BrowserRouter>,
    );

    const linkElement = screen.getByRole('link');

    expect(linkElement).toBeInTheDocument();
  });
});
