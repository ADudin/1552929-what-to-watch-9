import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';

import {useAppSelector} from '../../hooks/hooks';

import {
  AppRoute
} from '../../const';

import MainComponent from '../main-component/main-component';
import SignInComponent from '../sign-in-component/sign-in-component';
import MyListComponent from '../my-list-component/my-list-component';
import MoviePageComponent from '../movie-page-component/movie-page-component';
import AddReviewComponent from '../add-review-component/add-review-component';
import PlayerComponent from '../player-component/player-component';
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
    <BrowserRouter>
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
              <MyListComponent films = {films} />
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
