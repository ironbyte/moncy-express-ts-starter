import express from 'express';

import { db } from '#src/drizzle/index.ts';
import { users } from '#src/drizzle/schema/users.ts';

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

router.get('/users', async (req, res) => {
  const allUsers = await db.select().from(users);

  res.status(200).json({
    users: allUsers,
  });
});

router.post('/users', async (req, res) => {
  const allUsers = await db.select().from(users);

  res.status(200).json({
    users: allUsers,
  });
});

export default router;
