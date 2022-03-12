import {Film} from '../../../../types/film';

type DetailsTabProps = {
  film: Film | object,
}

const getRuntimeFromMinutes = (mins: number) => {
  if (!mins) {
    return;
  }

  const HOURS_ABB = 'h ';
  const MINUTES_ABB = 'm';
  const hours: number = Math.trunc(mins / 60);
  const minutes: number = mins % 60;

  if (mins < 60) {

    return minutes + MINUTES_ABB;
  }

  if (minutes === 0) {

    return hours + HOURS_ABB;
  }

  return hours + HOURS_ABB + minutes + MINUTES_ABB;
};

function DetailsTab({film}: DetailsTabProps): JSX.Element {
  const {
    director,
    starring,
    runTime,
    genre,
    released,
  } = film as Film;

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starring.join(', ')}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getRuntimeFromMinutes(runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default DetailsTab;
