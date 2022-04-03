import {createSlice} from '@reduxjs/toolkit';

import {
  NameSpace,
  AuthorizationStatus
} from '../../const';

import {UserProcess} from '../../types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {},
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    loadUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {requireAuthorization, loadUserData} = userProcess.actions;
