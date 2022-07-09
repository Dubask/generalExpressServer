import request from 'supertest';
import app from '../app';

describe('Register', () => {
  it('return 200 when signup request is valid', done => {
    request(app)
      .post('/api/users')
      .send({
        username: 'user1',
        email: 'user@email.com',
        password: 'password',
      })
      .expect(200, done);
  });
});
