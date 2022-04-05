import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  console.log('authHeader', authHeader);

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, `${process.env.JWT_SECRET}`);

    console.log('token verify data', decoded);

    // request.user = user;

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
