import { InferModel } from 'drizzle-orm';

import { db } from '#src/drizzle/index.ts';
import { users, insertUserSchema } from '#src/drizzle/schema/users.ts';
import { generatePublicId } from '#src/utils/public-id.ts';

export type User = InferModel<typeof users>;

export const getAllUsers = async (): Promise<User[]> => {
  const allUsers = await db.select().from(users);

  return allUsers;
};

export const createUser = async ({
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
