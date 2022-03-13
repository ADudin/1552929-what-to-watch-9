import LogoComponent from '../logo-component/logo-component';
import MovieTabs from './tabs/movie-tabs';
import FilmsListComponent from '../films-list-component/films-list-comonent';
import UserBlockComponent from '../user-block-component/user-block-component';

import {Film} from '../../types/film';
import {useEffect} from 'react';

import {
  useParams,
  Link
} from 'react-router-dom';

import {AuthorizationStatus} from '../../const';

import {
  useAppDispatch,
  useAppSelector
} from '../../hooks/hooks';

import {
  fetchFilmAction,
  fetchSimilarFilmsAction,
  fetchReviewsAction
} from '../../store/api-actions';

function MoviePageComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const filmId = Number(params.id);

  useEffect(() => {
    dispatch(fetchFilmAction(filmId));
    dispatch(fetchSimilarFilmsAction(filmId));
    dispatch(fetchReviewsAction(filmId));
  }, [dispatch, filmId]);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const film = useAppSelector((state) => state.film);
  const similarFilms = useAppSelector((state) => state.similarFilms);
  const reviews = useAppSelector((state) => state.reviews);

  const {
    id,
    name,
    posterImage,
    backgroundImage,
    genre,
    released,
  } = film as Film;

  const filteredSimilarFilms = similarFilms?.filter((item) => item.id !== filmId);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <LogoComponent />

            <UserBlockComponent />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
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
                {
                  authorizationStatus === AuthorizationStatus.Auth ?
                    <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
                    : ''
                }

              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <MovieTabs film = {film} reviews = {reviews} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {<FilmsListComponent films = {filteredSimilarFilms} />}
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

export default MoviePageComponent;
