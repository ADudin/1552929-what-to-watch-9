import {Film} from '../../types/film';

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
        <a className="small-film-card__link" href="film-page.html">{film.name}</a>
      </h3>
    </>
  );
}

export default FilmCardComponent;
