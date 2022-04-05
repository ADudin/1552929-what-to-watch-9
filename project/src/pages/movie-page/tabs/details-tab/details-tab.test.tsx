import {
  render,
  screen
} from '@testing-library/react';

import DetailsTab from './details-tab';
import {makeFakeFilmData} from '../../../../utils/mock';

const film = makeFakeFilmData();

describe('Component: DetailsTab', () => {
  it('shoiuld render correctly', () => {
    render(<DetailsTab film = {film} />);

    const runTimeElement = screen.getByTestId('run-time');
    const genreElement = screen.getByTestId('genre');
    const releasedElement = screen.getByTestId('released');

    expect(runTimeElement).toBeInTheDocument();
    expect(genreElement).toBeInTheDocument();
    expect(releasedElement).toBeInTheDocument();
  });
});
