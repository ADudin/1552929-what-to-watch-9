import {userProcess} from './user-process';

import {
  requireAuthorization,
  loadUserData
} from './user-process';

import {AuthorizationStatus} from '../../const';
import {makeFakeUserData} from '../../utils/mock';

const userData = makeFakeUserData();

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, userData: {}});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.Unknown, userData: {}};

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: {}});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth, userData: {}};

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: {}});
  });

  it('should update userData by user data', () => {
    const state = {authorizationStatus: AuthorizationStatus.Auth, userData: {}};

    expect(userProcess.reducer(state, loadUserData(userData)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: userData});
  });
});
