import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundComponent(): JSX.Element {
  return (
    <
      section className="catalog"
      data-testid='not-found-component'
    >
      <h1 className="catalog__title">404. Page not found</h1>
      <div className="catalog__button">
        <Link to={AppRoute.Main}>Go to main page</Link>
      </div>
    </section>
  );
}

export default NotFoundComponent;
