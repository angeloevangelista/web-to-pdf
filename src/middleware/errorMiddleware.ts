import { ErrorRequestHandler } from 'express';

import AppError from '../errors/AppError';
import EResponseStatus from '../enums/EResponseStatus';

const errorMiddleware: ErrorRequestHandler = (
  error,
  request,
  response,
  next,
) => {
  const responseObject = {
    status: EResponseStatus.Error,
    message: 'Internal Server Error',
    data: Object,
  };

  response.status(500);

  if (error instanceof AppError) {
    response.status(error.statusCode);

    responseObject.message = error.message;
  }

  console.log('❌  An error occurred.', error);

  return response.json(responseObject);
};

export default errorMiddleware;
