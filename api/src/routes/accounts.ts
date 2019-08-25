import express from 'express';
import { Account } from '../models/account';
import * as Joi from '@hapi/joi';

const router = express.Router();

const schema = Joi.object().keys({
  amount: Joi.number().precision(2),
  appUserId: Joi.number().min(0),
});

router.get('/', (req, res) => {
  Account.findAll().then(accounts => {
    res.send(accounts);
  });
});

router.post('/', (req, res) => {
  Joi.validate(req.body, schema).then(_result => {
    Account.create(req.body)
      .then(account => {
        res.send(account);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  });
});

export { router };
