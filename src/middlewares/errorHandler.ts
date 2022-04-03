import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/AppError';

export default function handleError(
  error: AppError | Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errorResponse = {
    error: {
      status: 500,
      message: `Internal server error: ${error.message}`,
    },
  };

  if (error instanceof AppError) {
    errorResponse.error.status = error.statusCode;
    errorResponse.error.message = error.message;

    console.error(errorResponse);

    return response.status(error.statusCode).json(errorResponse);
  }

  console.error(errorResponse);
  return response.status(500).json({
    error: {
      status: 500,
      message: `Internal server error: ${error.message}`,
    },
  });
}
