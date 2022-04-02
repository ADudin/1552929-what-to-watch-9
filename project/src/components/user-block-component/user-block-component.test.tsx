import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

import UserBlockComponent from './user-block-component';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();

describe('Component: UserBlockComponent', () => {
  it('should render correctly in case of user authorized', () => {

    render(
      <Provider store = {mockStore({USER: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element = {<UserBlockComponent />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    const userAvatarElement = screen.getByTestId('user-block__avatar');
    const linkElement = screen.getByRole('link');

    expect(userAvatarElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('should render correctly in case of user not authorized', () => {

    render(
      <Provider store = {mockStore({USER: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element = {<UserBlockComponent />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    const linkElement = screen.getByRole('link');

    expect(linkElement).toBeInTheDocument();
  });
});
