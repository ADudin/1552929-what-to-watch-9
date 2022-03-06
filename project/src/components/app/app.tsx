import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';

import {
  AppRoute,
  AuthorizationStatus
} from '../../const';

import MainComponent from '../main-component/main-component';
import SignInComponent from '../sign-in-component/sign-in-component';
import MyListComponent from '../my-list-component/my-list-component';
import MoviePageComponent from '../movie-page-component/movie-page-component';
import AddReviewComponent from '../add-review-component/add-review-component';
import PlayerComponent from '../player-component/player-component';
import NotFoundComponent from '../not-found-component/not-found-component';
import PrivatRoute from '../private-route/private-route';
import {Film} from '../../types/film';
import {Review} from '../../types/review';

type AppScreenProps = {
  promoFilmCard: {
    name: string,
    genre: string,
    released: number,
  };
  films: Film[];
  reviews: Review[];
}

function App({promoFilmCard, films, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainComponent promoFilmCard={promoFilmCard} films={films}/>}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignInComponent />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivatRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListComponent films = {films} />
            </PrivatRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePageComponent films = {films} reviews = {reviews} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewComponent films = {films} />}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerComponent films= {films} />}
        />
        <Route
          path="*"
          element={<NotFoundComponent />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
