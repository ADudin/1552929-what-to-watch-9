import {
  render,
  screen
} from '@testing-library/react';

import OverviewTab from './overview-tab';
import {makeFakeFilmData} from '../../../../utils/mock';

const film = makeFakeFilmData();

describe('Component: OverviewTab', () => {
  it('should render correctly', () => {
    render(<OverviewTab film = {film} />);

    const ratingElement = screen.getByTestId('rating');
    const textRatingElement = screen.getByTestId('text-rating');
    const scoresCountElement = screen.getByTestId('scores-count');
    const descriptionElement = screen.getByTestId('description');
    const directorElement = screen.getByTestId('director');
    const starringElement = screen.getByTestId('starring');

    expect(ratingElement).toBeInTheDocument();
    expect(textRatingElement).toBeInTheDocument();
    expect(scoresCountElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(directorElement).toBeInTheDocument();
    expect(starringElement).toBeInTheDocument();
  });
});
