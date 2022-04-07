import {Review} from '../../../../types/review';
import dayjs from 'dayjs';

type ReviewsTabProps = {
  reviews: Review[],
}

const getFormattedDate = (date: string) => {
  const formattedDate = dayjs(date).format('MMMM DD, YYYY');

  return formattedDate;
};

function ReviewsTab({reviews}: ReviewsTabProps): JSX.Element {

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p
                className="review__text"
                data-testid = 'comment'
              >
                {review.comment}
              </p>

              <footer className="review__details">
                <cite
                  className="review__author"
                  data-testid = 'author'
                >
                  {review.user.name}
                </cite>
                <time
                  className="review__date"
                  dateTime={review.date}
                  data-testid = 'review-date'
                >
                  {getFormattedDate(review.date)}
                </time>
              </footer>
            </blockquote>

            <div
              className="review__rating"
              data-testid = 'rating'
            >
              {review.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsTab;
