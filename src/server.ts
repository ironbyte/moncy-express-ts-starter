import compression from 'compression';
import express from 'express';
import getPort from 'get-port';
import helmet from 'helmet';
import morgan from 'morgan';

import '#env.ts';
import routes from '#src/routes/index.ts';
import { getAllUsers } from '#src/services/users.ts';

const appName = 'moncy-express-ts-starter';
const preferredPortNumber = process.env.PORT || 3000;

const app = express();

morgan.token('url', (req, res) => decodeURIComponent(req.url ?? ''));
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');

app.get('/', (req, res) => res.redirect('/v1/'));

app.use('/v1', routes);

app.get('/users', async (req, res) => {
  const allUsers = await getAllUsers();

  res.status(200).json({ users: allUsers });
});

app.listen(preferredPortNumber, () => {
  console.log(
    `${appName} app started on http://localhost:${preferredPortNumber}`,
  );
});
