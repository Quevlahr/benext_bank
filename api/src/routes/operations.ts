import express from 'express';
import { Operation } from '../models/operation';
import * as Joi from '@hapi/joi';

const router = express.Router();

const schema = Joi.object().keys({
  amount: Joi.number().precision(2),
  appUserId: Joi.number().min(0),
});

router.get('/', (req, res) => {
  Operation.findAll().then(operations => {
    res.send(operations);
  });
});

export { router };
