import express from 'express';
import mongoose from 'mongoose';
import { Item } from '../types/Book.type';
import { logger } from '../utils/errors/logger';
import status from 'statuses';
import UserModel from '../db/models/User';

const UserController = express.Router();

UserController.get('/', async (req, res, next) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json({ users });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default UserController;
