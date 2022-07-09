import request from 'supertest';
import app from '../app';
import UserModel from '../db/models/User';
import mongoose from 'mongoose';

let mongooseCommand = 'save';
describe('Register', () => {
  beforeEach(() => {
    jest
      .spyOn(UserModel.prototype, mongooseCommand)
      .mockImplementationOnce(() => Promise.reject('fail update'));
  });
  afterAll(() => {
    jest.restoreAllMocks();
    mongoose.disconnect();
  });
  it('return 200 when signup request is valid', async () => {
    mongooseCommand = 'insert';
    const response = await request(app).post('/api/auth/register').send({
      username: 'user1',
      email: 'user@email.com',
      password: 'password',
    });

    expect(response.status).toBe(200);
  });
});
