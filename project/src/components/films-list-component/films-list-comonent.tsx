import {Film} from '../../types/film';
import FilmCardComponent from '../film-card-component/film-card-component';

type FilmsListComponentProps = {
  films: Film[],
}

function FilmsListComponent ({films}: FilmsListComponentProps): JSX.Element {

  return (
    <>
      {films.map((film) =>(
        <article className="small-film-card catalog__films-card" key = {film.id}>
          <FilmCardComponent film = {film} />
        </article>
      ))}
    </>
  );
}

export default FilmsListComponent;
