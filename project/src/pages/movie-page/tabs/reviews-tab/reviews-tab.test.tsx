import {
  render,
  screen
} from '@testing-library/react';

import ReviewsTab from './reviews-tab';
import {makeFakeReview} from '../../../../utils/mock';

const reviews = [makeFakeReview()];

describe('Component: ReviewsTab', () => {
  it('should render correctly', () => {
    render (<ReviewsTab reviews = {reviews} />);

    const commentElement = screen.getByTestId('comment');
    const authorElement = screen.getByTestId('author');
    const reviewDateElement = screen.getByTestId('review-date');
    const ratingElement = screen.getByTestId('rating');

    expect(commentElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(reviewDateElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
  });
});
