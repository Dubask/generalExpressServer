import express from 'express';
import { logger } from '../../utils/errors/logger';
import status from 'statuses';
import UserModel from '../../db/models/User';
import {
  authenticatePasswords,
  createAndAttachJwtTokens,
  encryptPassword,
} from './helpers';
import { validateLoginUserBody, validateRegisterUserBody } from './validations';
import { User } from '../../types/User.type';

const AuthController = express.Router();

AuthController.post('/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const isAuthenticated = validateRegisterUserBody({
      username,
      password,
      email,
    });

    if ((await isAuthenticated).error) throw 'register auth error';

    const hashedPassword = await encryptPassword(password);

    const user = (await UserModel.create({
      username,
      password: hashedPassword,
      email,
    })) as unknown as User;

    res = createAndAttachJwtTokens(user, res);
    res.status(200).json({ user });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

AuthController.post('/login', async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const isAuthenticated = validateLoginUserBody({
      password,
      email,
    });

    if ((await isAuthenticated).error) throw 'login auth error';

    const user = (await UserModel.findOne({ email })) as User;

    const isPasswordAuthenticated = await authenticatePasswords(
      password,
      user.password
    );

    if (!isPasswordAuthenticated) throw 'login auth error';

    user.password = '';
    console.log(
      'file: AuthController.ts ~ line 64 ~ AuthController.post ~ user',
      user
    );

    res = createAndAttachJwtTokens(user, res);

    res.status(200).json('OK');
  } catch (error) {
    console.log('errrr', error);
    logger.error(error);
    next(error);
  }
});

export default AuthController;
