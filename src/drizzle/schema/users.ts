import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = pgTable('users', {
  id: varchar('id', { length: 14 }).primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users);

// Schema for selecting a user - can be used to validate API responses
const selectUserSchema = createSelectSchema(users);
