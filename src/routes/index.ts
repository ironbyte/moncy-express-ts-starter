import express from 'express';
import 'express-async-errors';

import usersRouters from './users.ts';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Home',
  });
});

router.get('/healthcheck', (req, res) => {
  res.status(200).json({
    message: 'OK',
  });
});

router.use('/users', usersRouters);

export default router;
