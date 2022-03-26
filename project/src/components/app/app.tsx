import {
  Route,
  Routes
} from 'react-router-dom';

import {useAppSelector} from '../../hooks/hooks';

import {
  AppRoute
} from '../../const';

import MainComponent from '../../pages/main-page/main-page';
import SignInComponent from '../../pages/sign-in-page/sign-in-page';
import MyListComponent from '../../pages/my-list-page/my-list-page';
import MoviePageComponent from '../../pages/movie-page/movie-page';
import AddReviewComponent from '../../pages/add-review-page/add-review-page';
import PlayerComponent from '../../pages/player-page/player-page';
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
        element={<MainComponent />}
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignInComponent />}
      />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivatRoute authorizationStatus={authorizationStatus}>
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
        element={<AddReviewComponent films = {films} />}
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
  );
}

export default App;
