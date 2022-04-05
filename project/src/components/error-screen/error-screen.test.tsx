import {
  render,
  screen
} from '@testing-library/react';

import ErrorScreen from './error-screen';
import {LOADING_ERROR_MESSAGE} from '../../const';

describe('Component: ErrorScreen', () => {
  it('should render correctly', () => {
    render(<ErrorScreen error = {LOADING_ERROR_MESSAGE} />);

    const titleElement = screen.getByText(LOADING_ERROR_MESSAGE);

    expect(titleElement).toBeInTheDocument();
  });
});
