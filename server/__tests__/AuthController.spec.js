import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import UserModel from '../db/models/User';
import { fakeSavedUser, fakeUser } from '../__mocks__/AuthController';

describe('Register', () => {
  let mongooseCommand = 'save';
  beforeEach(() => {
    jest
      .spyOn(UserModel.prototype, mongooseCommand)
      .mockImplementationOnce(() => Promise.reject('fail update'));
  });
  afterAll(() => {
    jest.restoreAllMocks();
    mongoose.connection.close();
  });

  it('return 200 when signup request is valid', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(fakeUser);

    expect(response.status).toBe(200);
  });
  it('return the saved user when register was successful', async () => {
    const res = await request(app).post('/api/auth/register').send(fakeUser);
    const savedUser = JSON.parse(res.text);

    expect(savedUser.user).toMatchObject({
      ...fakeSavedUser,
      _id: expect.any(String),
    });
  });
});
