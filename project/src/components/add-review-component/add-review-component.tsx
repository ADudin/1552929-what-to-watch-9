import {
  useParams,
  Link
} from 'react-router-dom';
import {Film} from '../../types/film';
import LogoComponent from '../logo-component/logo-component';
import ReviewFormComponent from '../review-form-component/review-form-component';

type AddReviewComponentProps = {
  films: Film[];
}


function AddReviewComponent({films}: AddReviewComponentProps): JSX.Element {
  const params = useParams();
  const film = films.find((item) => item.id === Number(params.id));
  const rating = Number(film?.rating);

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

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
        </div>
      </div>

      <ReviewFormComponent rating = {rating} />

    </section>

  );
}

export default AddReviewComponent;
