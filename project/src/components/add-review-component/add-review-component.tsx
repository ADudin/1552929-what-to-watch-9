import {
  useParams,
  useNavigate,
  Link
} from 'react-router-dom';

import {Film} from '../../types/film';
import LogoComponent from '../logo-component/logo-component';
import UserBlockComponent from '../user-block-component/user-block-component';
import ReviewFormComponent from '../review-form-component/review-form-component';
import {useAppSelector} from '../../hooks/hooks';
import {useEffect} from 'react';
import {
  AuthorizationStatus,
  AppRoute
} from '../../const';

type AddReviewComponentProps = {
  films: Film[];
}


function AddReviewComponent({films}: AddReviewComponentProps): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const film = films.find((item) => item.id === Number(params.id));

  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }
  }, [navigate, authorizationStatus]);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <LogoComponent />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film?.id}`} className="breadcrumbs__link">{film?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`/films/${film?.id}/review`}>Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlockComponent />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
        </div>
      </div>

      <ReviewFormComponent />

    </section>

  );
}

export default AddReviewComponent;
