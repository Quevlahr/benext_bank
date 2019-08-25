import { app } from '../../src/app';
import chai = require('chai');
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);

describe('Users tests', () => {
  describe('CREATE a new user and a new account', () => {
    let first_user_to_delete: number | null = null;
    it('should return all informations about the new user', async () => {
      const userResult = await chai
        .request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send(
          `{"username":"firstUser", "firstName":"Olivier", ` +
            `"lastName":"Patrick", "age":25}`
        );
      chai.expect(userResult).to.have.status(200);
      const userId = JSON.parse(userResult.text).id;
      chai.expect(userResult.text).to.be.a('string');
      const accountResult = await chai
        .request(app)
        .post('/api/accounts')
        .set('Content-Type', 'application/json')
        .send({
          amount: 200,
          appUserId: userId,
        });
      chai.expect(accountResult).to.have.status(200);
      chai.expect(accountResult.text).to.be.a('string');
    });
    describe('Create a new account link to an user', () => {});
  });
  describe('GET all users', () => {
    it('should return all users', async () => {
      const result = await chai.request(app).get('/api/users');
      chai.expect(result).to.have.status(200);
      chai.expect(result).to.be.json;
      chai.expect(result.text).to.be.a('string');
    });
  });
  describe('GET first user', () => {
    it('should return all informations about one user', async () => {
      // First it add an user to be sure there is one in base.
      chai
        .request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send(`{"username":"Second","age":25}`)
        .then(result => {
          chai.expect(result).to.have.have.status(200);
          const user = JSON.parse(result.text);
          const user_to_get = user.id;
          return user_to_get;
        })
        .then(async user_to_get => {
          const result = await chai
            .request(app)
            .get(`/api/users/${user_to_get}`);
          chai.expect(result).to.have.status(200);
          chai.expect(result).to.be.json;
          chai.expect(result.text).to.be.a('string');
          return user_to_get;
        })
        .then(user_to_delete => {
          chai
            .request(app)
            .delete(`/api/users/${user_to_delete}`)
            .then(result => {
              chai.expect(result).to.have.status(200);
            });
        });
    });
  });
  describe('DELETE an user', () => {
    let last_user_to_delete: number | null = null;
    before(async () => {
      const result = await chai
        .request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send(
          `{"username":"secondUser", "firstName":"Quentin", ` +
            `"lastName":"Roulon", "age":25}`
        );
      chai.expect(result).to.have.status(200);
      last_user_to_delete = JSON.parse(result.text).id;
    });
    it('should return all informations about the deleted user', async () => {
      // First get all the users to delete the last one
      const result = await chai
        .request(app)
        .delete(`/api/users/${last_user_to_delete}`);
      chai.expect(result).to.have.status(200);
      chai.expect(result.text).to.be.a('string');
    });
  });
});
