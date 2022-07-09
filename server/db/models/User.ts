import { Schema, model, Types, set } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const UserModel = model('User', UserSchema);

export default UserModel;
