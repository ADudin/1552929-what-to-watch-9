import {Film} from '../../types/film';
import FilmCardComponent from '../film-card-component/film-card-component';
import {useState} from 'react';

type FilmsListComponentProps = {
  films: Film[],
}

function FilmsListComponent ({films}: FilmsListComponentProps): JSX.Element {
  const [activeFilmCard, setActiveFilmCard] = useState<null | number>(null);
  const handleMouseOnFilmCard = (id: number) => {
    setActiveFilmCard(id);
  };

  return (
    <>
      {films.map((film) =>(
        <article className="small-film-card catalog__films-card" key = {film.id} onMouseEnter = {() => {handleMouseOnFilmCard(film.id);}}>
          <FilmCardComponent film = {film} />
        </article>
      ))}
      {activeFilmCard}
    </>
  );
}

export default FilmsListComponent;
