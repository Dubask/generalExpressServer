/* istanbul ignore next */

export const fakeUser = {
  username: 'user1',
  email: 'user@email.com',
  password: 'password',
};

export const fakeSavedUser = {
  ...fakeUser,
  _id: '123',
  __v: 0,
};

export const fakePassword = '123';
