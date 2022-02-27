import {Film} from '../../types/film';
import {Link} from 'react-router-dom';

type FilmCardComponentProps = {
  film: Film,
}

function FilmCardComponent({film}: FilmCardComponentProps): JSX.Element {
  return (
    <>
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </>
  );
}

export default FilmCardComponent;
