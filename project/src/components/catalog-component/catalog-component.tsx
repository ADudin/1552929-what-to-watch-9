import GenresListComponent from '../genres-list-component/genres-list-component';
import FilmsListComponent from '../films-list-component/films-list-comonent';
import ShowMoreButtonComponent from '../show-more-button-component/show-more-button-component';

import {
  useState,
  useEffect
} from 'react';

import {
  useAppDispatch,
  useAppSelector
} from '../../hooks/hooks';

import {resetCountAction} from '../../store/film-process/film-process';

import {DEFAULT_ACTIVE_GENRE} from '../../const';

function CatalogComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const initialFilms = useAppSelector(({DATA}) => DATA.films);
  const {
    activeGenre,
    filmCardsCount,
  } = useAppSelector(({FILM}) => FILM);

  const filteredFilms = activeGenre === DEFAULT_ACTIVE_GENRE ? initialFilms : initialFilms.filter((film) => film.genre === activeGenre);


  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    setGenres([DEFAULT_ACTIVE_GENRE, ...new Set(initialFilms.map((film) => film.genre))]);
    dispatch(resetCountAction());
  }, [dispatch, initialFilms]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        <GenresListComponent genres = {genres} />
      </ul>

      <div className="catalog__films-list">
        <FilmsListComponent films = {filteredFilms.slice(0, filmCardsCount)} />
      </div>

      <div className="catalog__more">
        {filteredFilms.length > filmCardsCount ? <ShowMoreButtonComponent /> : ''}
      </div>
    </section>
  );
}

export default CatalogComponent;
