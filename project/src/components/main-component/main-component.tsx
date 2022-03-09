import FilmsListComponent from '../films-list-component/films-list-comonent';
import LogoComponent from '../logo-component/logo-component';
import GenresListComponent from '../genres-list-component/genres-list-component';
import ShowMoreButtonComponent from '../show-more-button-component/show-more-button-component';
import {Film} from '../../types/film';
import {useState, useEffect} from 'react';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks/hooks';
import {State} from '../../types/state';
import {DEFAULT_ACTIVE_GENRE} from '../../const';
import {resetCountAction} from '../../store/action';

type MainComponentProps = {
  promoFilmCard: {
    name: string,
    genre: string,
    released: number,
  };
  films: Film[],
}

function MainComponent({promoFilmCard, films}: MainComponentProps): JSX.Element {
  const filteredFilms = useAppSelector((state: State) => state.films);
  const renderedFilmCards = useAppSelector((state: State) => state.filmCardsCount);
  const dispatch = useAppDispatch();

  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    setGenres([DEFAULT_ACTIVE_GENRE, ...new Set(films.map((film) => film.genre))]);
  }, [films]);

  useEffect(() => {
    dispatch(resetCountAction());
  }, [dispatch]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <LogoComponent />

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" href="/">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilmCard.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilmCard.genre}</span>
                <span className="film-card__year">{promoFilmCard.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
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
            <FilmsListComponent films = {filteredFilms.slice(0, renderedFilmCards)} />
          </div>

          <div className="catalog__more">
            {filteredFilms.length > renderedFilmCards ? <ShowMoreButtonComponent /> : ''}
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
