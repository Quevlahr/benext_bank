import express from 'express';
const router = express.Router();
// import { user_repository } from '../database/user_repository';
import { User } from '../models/user';
import * as Joi from '@hapi/joi';

// import { Database } from '../database/database';
// const user = new Database(
//   { username: Database.STRING, age: Database.NUMBER },
//   'app_user'
// );

router.use(function(_req, _res, next) {
  console.log('A request has been made to the users route');
  console.log('Time:', Date.now());
  next();
});

router.get('/', (req, res) => {
  User.findAll().then(users => {
    console.log('GET all users');
    res.send(users);
  });
});

const schema = Joi.object()
  .keys({
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
  })
  .with('username', 'birthyear')
  .without('password', 'access_token');

router.post('/', (req, res) => {
  const user = new User();
  // user.username =
  // if ()
  console.log(req.body.firstName);
  if (req.body.firstName === null) {
    res.status(400).send('the firstName is required');
    return;
  }

  User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
    .then(result => {
      console.log('ca marche');
      console.log(result);
    })
    .catch(error => {
      res.status(400).send('Bad request');
    });
});

// router.get('/', (req, res) => {
//   // user.findBy({ test: 'test' }).execute();
//   user
//     .find()
//     .execute()
//     .then(result => {
//       res.send(result.rows);
//     })
//     .catch(error => {
//       res.status(404).send(error.stack);
//     });
//   // user_repository
//   //   .getUsers()
//   //   .then(result => {
//   //     res.send(result.rows);
//   //   })
//   //   .catch(error => {
//   //     res.status(404).send(error.stack);
//   //   });
// });

// router.get('/:id', (req, res) => {
//   user_repository
//     .getUser(parseInt(req.params.id))
//     .then(result => {
//       res.send(result.rows[0]);
//     })
//     .catch(error => {
//       res.status(404).send(error.stack);
//     });
// });

// router.post('/', (req, res) => {
//   const user = new User(req.body.username, req.body.age);

//   user_repository
//     .postUser(user)
//     .then(result => {
//       res.send(result.rows[0]);
//     })
//     .catch(error => {
//       res.status(404).send(error.stack);
//     });
// });

// router.delete('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   user_repository
//     .getUser(id)
//     .then(result => {
//       user_repository
//         .deleteUser(id)
//         .then(_ => {
//           res.send(result.rows[0]);
//         })
//         .catch(error => {
//           res.status(404).send(error.stack);
//         });
//     })
//     .catch(error => {
//       res.status(404).send(error.stack);
//     });
// });

export { router };
