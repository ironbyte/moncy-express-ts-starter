import express from 'express';
import 'express-async-errors';
import httpStatus from 'http-status';

import usersRouter from './users.ts';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(httpStatus.OK).json({
    message: 'Home',
  });
});

router.get('/healthcheck', (req, res) => {
  res.status(httpStatus.OK).json({
    message: 'OK',
  });
});

router.use('/users', usersRouter);

export default router;
