import express from 'express';
import { z } from 'zod';

import { db } from '#src/drizzle/index.ts';
import { users, insertUserSchema } from '#src/drizzle/schema/users.ts';
import { CustomError } from '#src/middlewares/handleError.ts';
import { validate } from '#src/middlewares/validate.ts';
import { createUser } from '#src/services/users.ts';

const createUserSchema = z.object({
  body: insertUserSchema.pick({
    email: true,
    name: true,
  }),
});

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

router.post('/users', validate(createUserSchema), async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const insertedUser = await createUser({
      name,
      email,
    });

    res.status(200).json({
      user: insertedUser,
    });
  } catch (error) {
    console.log('error: ', error?.message);

    next(new CustomError(501, error?.message));
  }
});

export default router;
