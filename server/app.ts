import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import BookController from './controllers/ItemController';
import handleErrors from './middlewares/handleErrors';
import status from 'statuses';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';

dotenv.config();

const app = express();

(async function () {
  await mongoose.connect(process.env.MONGO_DB_URI);
})();
const db = mongoose.connection;
db.on('error', () => console.log('DB connection error'));
db.once('open', () => console.log('db connect'));

// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/auth', AuthController);
app.use('/api/users', UserController);
app.use('/api/book', BookController);
app.use('/api/book-notes', (req, res) => {});
app.get('*', function (req, res, next) {
  const notFound = status(404);

  next(notFound);
});

// MIDDLEWARES
app.use(handleErrors);

export default app;
