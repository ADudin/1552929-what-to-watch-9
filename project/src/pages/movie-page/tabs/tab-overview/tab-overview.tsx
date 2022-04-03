import {Film} from '../../../../types/film';
import {TextRating} from '../../../../const';

type OverviewTabProps = {
  film: Film | object,
}

const getTextRating = (rating: number) => {
  if (rating < 3) {
    return TextRating.Bad;
  }
  if (rating < 5) {
    return TextRating.Normal;
  }
  if (rating < 8) {
    return TextRating.Good;
  }
  if (rating < 10) {
    return TextRating.VeryGood;
  }

  return TextRating.Awesome;
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
