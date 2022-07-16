import {
  validateRegisterUserBody,
  validateLoginUserBody,
} from '../validations';
import { fakeUser } from '../__mocks__/mockedAuth';

describe('validations', () => {
  describe('validateRegisterUserBody', () => {
    it('should return pass when user body is valid', async () => {
      const isValid = await validateRegisterUserBody(fakeUser);

      expect(isValid.error).toBeFalsy();
    });
    it('should return ERROR when user body is NOT valid', async () => {
      delete fakeUser.email;
      const isValid = await validateRegisterUserBody(fakeUser);

      expect(isValid.error).toBeTruthy();
    });
  });
  describe('validateLoginUserBody', () => {
    it('should return pass when user body is valid', async () => {
      const isValid = await validateLoginUserBody(fakeUser);

      expect(isValid.error).toBeFalsy();
    });
    it('should return ERROR when user body is NOT valid', async () => {
      delete fakeUser.email;
      const isValid = await validateLoginUserBody(fakeUser);

      expect(isValid.error).toBeTruthy();
    });
  });
});
