import compression from 'compression';
import express from 'express';
import getPort from 'get-port';
import helmet from 'helmet';
import morgan from 'morgan';

import '../env.ts';
import { db } from './drizzle/index.ts';
import { users } from './drizzle/schema/users.ts';
import { generatePublicId } from './utils/public-id.ts';

const appName = 'moncy-express-ts-starter';
const preferredPortNumber = 9500;

const app = express();

morgan.token('url', (req, res) => decodeURIComponent(req.url ?? ''));
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');

console.log(await getPort());

app.get('/', (req, res) => {
  const publicIDsList = [];

  for (let i = 0; i < 25; i++) {
    const newId = generatePublicId();
    publicIDsList.push(newId);
  }

  res.status(200).json({
    publicIds: publicIDsList,
  });
});

app.get('/users', async (req, res) => {
  const allUsers = await db.select().from(users);

  res.status(200).json({ users: allUsers });
});

app.listen(preferredPortNumber, () => {
  console.log(
    `${appName} app listening on http://localhost:${preferredPortNumber}`,
  );
});
