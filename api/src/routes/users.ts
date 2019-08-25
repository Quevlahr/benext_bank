import express from 'express';
import * as Joi from '@hapi/joi';
import { User } from '../models/user';
import { Account } from '../models/account';
import { Operation } from '../models/operation';
import { isNull } from 'util';

const router = express.Router();

const userSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(50)
    .required(),
  firstName: Joi.string()
    .alphanum()
    .required(),
  lastName: Joi.string()
    .alphanum()
    .required(),
  age: Joi.number()
    .integer()
    .min(0)
    .max(200),
});

const operationSchema = Joi.object().keys({
  amount: Joi.number()
    .precision(2)
    .required(),
});

router.get('/', (req, res) => {
  User.findAll().then(users => {
    console.log('GET all users');
    res.send(users);
  });
});

router.post('/', (req, res) => {
  Joi.validate(req.body, userSchema)
    .then(_result => {
      User.create(req.body)
        .then(user => {
          res.send(user);
        })
        .catch(error => {
          res.status(400).send(error);
        });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('The id must be a number');
    return;
  }

  User.findByPk(id, {
    include: [
      {
        model: Account,
      },
    ],
  })
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('The id must be a number');
    return;
  }

  User.findByPk(id)
    .then(user => {
      User.destroy({
        where: {
          id: id,
        },
      })
        .then(_result => {
          res.send(user);
        })
        .catch(error => {
          res.status(400).send(error);
        });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.post('/:userId/accounts/:accountId/operations/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const accountId = parseInt(req.params.accountId);

  if (isNaN(userId) || isNaN(accountId)) {
    res.status(400).send('User id and account id must be numbers');
    return;
  }

  Joi.validate(req.body, operationSchema)
    .then(_result => {
      User.findOne({
        include: [
          {
            model: Account,
            where: { id: accountId, appUserId: userId },
          },
        ],
        where: {
          id: userId,
        },
      })
        .then(_user => {
          let operation = req.body;
          operation.appUserId = userId;
          operation.accountId = accountId;
          return Operation.create(operation);
        })
        .then(async operation => {
          const account = await Account.findByPk(accountId);
          if (isNull(account)) {
            res.status(400).send('Account not found');
            return;
          }
          const newAmount = account.amount + req.body.amount;
          Account.update(
            {
              amount: newAmount,
            },
            {
              where: {
                id: accountId,
              },
            }
          );
          res.send(operation);
        })
        .catch(error => {
          res.status(400).send(error);
        });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

export { router };
