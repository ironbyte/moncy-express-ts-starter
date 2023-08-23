import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export class CustomError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  // Log the error details for debugging
  console.error(`Error Status: ${status}, Error Message: ${message}`);

  res.status(status).json({
    status: 'error',
    statusCode: status,
    message: message,
  });
};
