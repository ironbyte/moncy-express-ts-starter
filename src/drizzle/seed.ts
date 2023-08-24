import { faker } from '@faker-js/faker';
import { z } from 'zod';

import '#env.ts';
import { db } from '#src/drizzle/index.ts';
import { users, insertUserSchema } from '#src/drizzle/schema/users.ts';
import { generatePublicId } from '#src/utils/public-id.ts';

type UserToBeInserted = z.infer<typeof insertUserSchema>;

const generateUserRows = (count: number): UserToBeInserted[] => {
  const rows: UserToBeInserted[] = [];

  for (let i = 0; i < count; i++) {
    rows.push({
      id: generatePublicId(),
      email: faker.internet.email(),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    });
  }

  return rows;
};

async function seed() {
  console.log('Seeding...');
  console.time('DB has been seeded!');

  // database teardown
  await db.delete(users);

  // database setup
  const newUserRows = generateUserRows(100);
  await db.insert(users).values(newUserRows).returning();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding done!');
    process.exit(0);
  });
