import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_DIRECT_URL || '', { max: 1 });

export const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'src/drizzle/migrations' });
