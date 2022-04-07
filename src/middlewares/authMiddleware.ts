import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

interface IToken {
  email: string;
  password: string;
  iat: number;
  exp: number;
}

export default async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authService = new AuthService();
  const userService = new UserService();
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const { email, password } = verify(
    token,
    `${process.env.JWT_SECRET}`
  ) as IToken;

  const user = await userService.findByEmail(email);

  if (!user) {
    throw new AppError('User not found', 401);
  }

  try {
    await authService.verifyTokenInBlackList(token);

    request.token = token;

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
