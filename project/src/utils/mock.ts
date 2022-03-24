import {
  name,
  internet
} from 'faker';

import {UserData} from '../types/user-data';

export const makeFakeUserData = (): UserData => ({
  id: Math.ceil(Math.random() * 100),
  email: internet.email(),
  name: name.findName(),
  avatarUrl: internet.avatar(),
  token: internet.password(),
} as UserData);
