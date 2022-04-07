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
  const MINUTES_IN_HOUR = 60;
  const hours: number = Math.trunc(mins / MINUTES_IN_HOUR);
  const minutes: number = mins % MINUTES_IN_HOUR;

  if (mins < MINUTES_IN_HOUR) {

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
          <span
            className="film-card__details-value"
            data-testid = 'run-time'
          >
            {getRuntimeFromMinutes(runTime)}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span
            className="film-card__details-value"
            data-testid = 'genre'
          >
            {genre}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span
            className="film-card__details-value"
            data-testid = 'released'
          >
            {released}
          </span>
        </p>
      </div>
    </div>
  );
}

export default DetailsTab;
