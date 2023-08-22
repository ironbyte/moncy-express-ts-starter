import 'dotenv/config';
import { z, TypeOf } from 'zod';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof envSchema> {}
  }
}

const envSchema = z.object({
  DATABASE_DIRECT_URL: z.string(),
  SESSION_SECRET: z.string(),
});

try {
  envSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(', ')}` : field,
      )
      .join('\n  ');
    // TODO: FIGURE OUT A WAY TO EXIT THE PROCESS WHEN THIS PARTICULAR ERROR GETS THROWN
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
  }
}
