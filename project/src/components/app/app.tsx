import {
  Route,
  Routes
} from 'react-router-dom';

import {useAppSelector} from '../../hooks/hooks';

import {
  AppRoute
} from '../../const';

import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundComponent from '../not-found-component/not-found-component';
import LoadingScreen from '../loading-screen/loading-screen';

import PrivatRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  const {
    films,
    isDataLoaded,
  } = useAppSelector(({DATA}) => DATA);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignInPage />}
      />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivatRoute authorizationStatus={authorizationStatus}>
            <MyListPage />
          </PrivatRoute>
        }
      />
      <Route
        path={AppRoute.Film}
        element={<MoviePage />}
      />
      <Route
        path={AppRoute.AddReview}
        element={<AddReviewPage films = {films} />}
      />
      <Route
        path={AppRoute.Player}
        element={<PlayerPage />}
      />
      <Route
        path="*"
        element={<NotFoundComponent />}
      />
    </Routes>
  );
}

export default App;
