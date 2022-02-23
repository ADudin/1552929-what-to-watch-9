import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainComponent from '../main-component/main-component';
import SignInComponent from '../sign-in-component/sign-in-component';
import MyListComponent from '../my-list-component/my-list-component';
import MoviePageComponent from '../movie-page-component/movie-page-component';
import AddReviewComponent from '../add-review-component/add-review-component';
import PlayerComponent from '../player-component/player-component';
import NotFoundComponent from '../not-found-component/not-found-component';
import PrivatRoute from '../private-route/private-route';
import {Film} from '../../types/film';
import {Comment} from '../../types/comment';

type AppScreenProps = {
  promoFilmCard: {
    name: string,
    genre: string,
    released: number,
  };
  films: Film[];
  comments: Comment[];
}

function App({promoFilmCard, films, comments}: AppScreenProps): JSX.Element {
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
              <MyListComponent />
            </PrivatRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePageComponent />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewComponent />}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerComponent />}
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
