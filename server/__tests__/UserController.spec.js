import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import UserModel from '../db/models/User';
import { fakeSavedUser, fakeUser } from '../__mocks__/AuthController';

describe('UserController', () => {
  afterAll(() => {
    jest.restoreAllMocks();
    mongoose.connection.close();
  });

  it('should find all users', async () => {
    UserModel.find = jest.fn().mockResolvedValue([{ ...fakeSavedUser }]);

    const res = await request(app).get('/api/users').send([fakeUser]);
    const foundUsers = JSON.parse(res.text);

    expect(foundUsers.users).toEqual([{ ...fakeSavedUser }]);
  });
});
