import LogoComponent from '../logo-component/logo-component';
import UserBlockComponent from '../user-block-component/user-block-component';
import CatalogComponent from '../catalog-component/catalog-component';

import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {
  useAppSelector,
  useAppDispatch
} from '../../hooks/hooks';

import {State} from '../../types/state';
import {fetchPromoFilmAction} from '../../store/api-actions';
import {Film} from '../../types/film';

function MainComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  const promoFilmCard = useAppSelector((state: State) => state.promoFilm);

  const {
    id,
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
  } = promoFilmCard as Film;

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
        <CatalogComponent />

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
