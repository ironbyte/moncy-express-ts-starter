import { InferModel } from 'drizzle-orm';
import express from 'express';
import httpStatus from 'http-status';
import { z } from 'zod';

import { db } from '#src/drizzle/index.ts';
import { users, insertUserSchema } from '#src/drizzle/schema/users.ts';
import { validate } from '#src/middlewares/validate.ts';
import { generatePublicId } from '#src/utils/public-id.ts';

type User = InferModel<typeof users>;

const createUserSchema = z.object({
  body: insertUserSchema.pick({
    email: true,
    name: true,
  }),
});

const createUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<User> => {
  const publicId = generatePublicId();
  const newUser = insertUserSchema.parse({
    id: publicId,
    name,
    email,
  });

  const insertedUsers: User[] = await db
    .insert(users)
    .values(newUser)
    .returning();
  const insertedUser: User = insertedUsers[0];

  return insertedUser;
};

const getAllUsers = async () => {
  const allUsers = await db.select().from(users);

  return allUsers;
};

const usersRouter = express.Router();

usersRouter.post('/', validate(createUserSchema), async (req, res) => {
  const { name, email } = req.body;
  const insertedUser = await createUser({
    name,
    email,
  });

  res.status(httpStatus.OK).json({
    user: insertedUser,
  });
});

usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();

  res.status(httpStatus.OK).json({
    users,
  });
});

export default usersRouter;
