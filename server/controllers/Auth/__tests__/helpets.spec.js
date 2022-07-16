import { authenticatePasswords, encryptPassword } from '../helpers';
import { fakeUser } from '../__mocks__/mockedAuth';

describe('helpers', () => {
  describe('authenticatePasswords', () => {
    it('should return true when logged in password is correct', async () => {
      const fakeHashedPassword = await encryptPassword(fakeUser.password);
      const isValid = await authenticatePasswords(
        fakeUser.password,
        fakeHashedPassword
      );

      expect(isValid).toBeTruthy();
    });

    it('should return false when logged in password is wrong', async () => {
      const fakeHashedPassword = await encryptPassword(fakeUser.password);
      const isValid = await authenticatePasswords(
        'badPassword',
        fakeHashedPassword
      );

      expect(isValid).toBeFalsy();
    });
  });
});
