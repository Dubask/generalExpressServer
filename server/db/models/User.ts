import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  _id: String,
  username: String,
  email: String,
  password: String,
});

const UserModel = model('User', UserSchema);

export default UserModel;
