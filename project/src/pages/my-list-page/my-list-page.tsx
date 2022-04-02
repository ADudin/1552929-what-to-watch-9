import LogoComponent from '../../components/logo-component/logo-component';
import FilmsListComponent from '../../components/films-list-component/films-list-comonent';

import {useEffect} from 'react';

import {
  useAppSelector,
  useAppDispatch
} from '../../hooks/hooks';

import {fetchFavoriteAction} from '../../store/api-actions';

function MyListPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);

  const favoriteFilms = useAppSelector(({DATA}) => DATA.favorite);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <LogoComponent />

        <h1 className="page-title user-page__title">My list</h1>

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

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            favoriteFilms.length === 0 ?
              <p>There are no any favorite films in list.</p> :
              ''
          }
          <FilmsListComponent films = {favoriteFilms} />
        </div>
      </section>

      <footer className="page-footer">
        <LogoComponent />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListPage;
