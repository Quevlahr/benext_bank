// This file has been generated with:
// https://expressjs.com/fr/starter/generator.html

import express from 'express';

import { router as usersRouter } from './routes/users';
import { router as accountRouter } from './routes/accounts';

import { sequelize } from './database/sequelize';
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Yeah');
//   })
//   .catch(error => {
//     console.log(error.stack);
//   });

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/accounts', accountRouter);

// This function is called when no route is matching.
// Answers with "not found" page
app.use(function(_req, res, _next) {
  res.status(404).send('Not found');
});

export { app };
