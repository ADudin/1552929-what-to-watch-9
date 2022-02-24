import {Film} from '../../types/film';
import FilmCardComponent from '../film-card-component/film-card-component';

type FilmsListComponentProps = {
  films: Film[],
}

function FilmsListComponent ({films}: FilmsListComponentProps): JSX.Element {
  return (
    <>
      {films.map((film) => <FilmCardComponent film={film} key={film.id} />)}
    </>
  );
}

export default FilmsListComponent;
