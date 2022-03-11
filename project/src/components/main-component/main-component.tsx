import FilmsListComponent from '../films-list-component/films-list-comonent';
import LogoComponent from '../logo-component/logo-component';
import GenresListComponent from '../genres-list-component/genres-list-component';
import ShowMoreButtonComponent from '../show-more-button-component/show-more-button-component';
import UserBlockComponent from '../user-block-component/user-block-component';

import {
  useState,
  useEffect
} from 'react';

import {useNavigate} from 'react-router-dom';

import {
  useAppSelector,
  useAppDispatch
} from '../../hooks/hooks';

import {State} from '../../types/state';
import {DEFAULT_ACTIVE_GENRE} from '../../const';
import {resetCountAction} from '../../store/action';
import {Film} from '../../types/film';

function MainComponent(): JSX.Element {
  const initialFilms = useAppSelector((state: State) => state.films);
  const activeGenre = useAppSelector((state: State) => state.activeGenre);
  const promoFilmCard = useAppSelector((state: State) => state.promoFilm);
  const filteredFilms = activeGenre === DEFAULT_ACTIVE_GENRE ? initialFilms : initialFilms.filter((film) => film.genre === activeGenre);
  const renderedFilmCardsCount = useAppSelector((state: State) => state.filmCardsCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    id,
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
  } = promoFilmCard as Film;

  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    setGenres([DEFAULT_ACTIVE_GENRE, ...new Set(initialFilms.map((film) => film.genre))]);
  }, [initialFilms]);

  useEffect(() => {
    dispatch(resetCountAction());
  }, [dispatch]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <LogoComponent />

          <UserBlockComponent />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick = {() => navigate(`/player/${id}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <GenresListComponent genres = {genres} />
          </ul>

          <div className="catalog__films-list">
            <FilmsListComponent films = {filteredFilms.slice(0, renderedFilmCardsCount)} />
          </div>

          <div className="catalog__more">
            {filteredFilms.length > renderedFilmCardsCount ? <ShowMoreButtonComponent /> : ''}
          </div>
        </section>

        <footer className="page-footer">
          <LogoComponent />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainComponent;
