import {Film} from '../../../../types/film';
import {TEXT_RATING} from '../../../../const';

type OverviewTabProps = {
  film: Film | object,
}

const getTextRating = (rating: number) => {
  if (rating < 3) {
    return TEXT_RATING.BAD;
  }
  if (rating < 5) {
    return TEXT_RATING.NORMAL;
  }
  if (rating < 8) {
    return TEXT_RATING.GOOD;
  }
  if (rating < 10) {
    return TEXT_RATING.VERY_GOOD;
  }

  return TEXT_RATING.AWESOME;
};

function OverviewTab({film}: OverviewTabProps): JSX.Element {
  const {
    rating,
    scoresCount,
    description,
    director,
    starring,
  } = film as Film;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getTextRating(rating)}</span>
          <span className="film-rating__count">{`${scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring?.join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default OverviewTab;
