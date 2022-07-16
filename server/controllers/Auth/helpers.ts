import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../types/User.type';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

// import jwtPublicKey = path.resolve('') + '/keys/public_key.pem';
type ExpiryJwtProps = '30d' | '1d';
type Token = {
  name: string;
  tokenData: string;
};

export const authenticatePasswords = async (
  password: string,
  hashedPassword: string
) => await bcrypt.compare(password, hashedPassword);

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);

  return hashed;
};

export const createAndAttachJwtTokens = (user: User, res: Response) => {
  const accessToken = {
    name: 'accessToken',
    tokenData: createJwtToken(user, '1d'),
  };
  const refreshToken = {
    name: 'refreshToken',
    tokenData: createJwtToken(user, '30d'),
  };

  return attachJwtToCookie(res, accessToken, refreshToken);
};

const createJwtToken = (
  dataToTokenise: any,
  expiresIn: ExpiryJwtProps
): string => {
  const jwtPrivateKey = path.resolve('') + '/keys/private-key.pem';
  const cert = fs.readFileSync(jwtPrivateKey);
  const accessTokenOptions = {
    algorithm: 'RS256',
    expiresIn,
  };

  return jwt.sign({ dataToTokenise }, cert, accessTokenOptions);
};

export const attachJwtToCookie = (res, ...tokens: Token[]) => {
  tokens.forEach(token => {
    res.cookie(token.name, token.tokenData);
  });
  return res;
};

export const authenticateJwtToken = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) throw new Error('unAuthorized');

    const user = verifyJwtToken(accessToken);
    req.user = user;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

export const verifyJwtToken = (token: string) => {
  const options = {
    algorithms: ['RS256'],
  };
  const jwtPublicKey = path.resolve('') + '/keys/public-key.pem';
  const cert = fs.readFileSync(jwtPublicKey);

  return jwt.verify(token, cert, options);
};
