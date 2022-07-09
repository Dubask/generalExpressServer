import express from 'express';
import mongoose from 'mongoose';
import { Item } from '../types/Book.type';
import { logger } from '../utils/errors/logger';
import status from 'statuses';
import UserModel from '../db/models/User';

const AuthController = express.Router();

AuthController.post('/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = await UserModel.create({ username, password, email });

    res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default AuthController;
