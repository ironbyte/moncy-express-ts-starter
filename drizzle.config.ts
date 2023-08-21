import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema/*',
  out: './src/drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_DIRECT_URL || '',
  },
} satisfies Config;
