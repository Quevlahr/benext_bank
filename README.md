# BeNext Bank Technic test
Technic test with a bank API

Bank account kata

Think of your personal bank account experience. When in doubt, go for the simplest solution

Requirements :
- Deposit and Withdrawal
- Account statement (date, amount, balance)
- Statement printing
- The expected result is a service API, and its underlying implementation, that meets the expressed needs.
- a basic UI implementing functionality only, no fancy design, 
- Nothing more,especially no persistence.

User Stories

US 1:
- In order to save money
- As a bank client
- I want to make a deposit in my account

US 2:
- In order to retrieve some or all of my savings
- As a bank client
- I want to make a withdrawal from my account

US 3:
- In order to check my operations
- As a bank client
- I want to see the history (operation, date, amount, balance) of my operations

# To start the project
- install docker (for mac : https://docs.docker.com/docker-for-mac/install/)
- launch docker
- go in the clone directory
- Be sure that there is not another project with docker which are using the port 4000, change the port in the .env file to your convenience
- in the terminal type : `docker-compose up`
- To run the test type : `docker exec -it bank_api /bin/sh` and : `npm test`
- For testing with postman, this is the link of the collections of requests https://www.getpostman.com/collections/ad9d0b20314785c9beaf

# Summary
There is only the API

# Documentation
## Database gestion
- http://localhost:4001
- Systeme : PostgreSQL
- Serveur : db
- Utilisateur : postgres
- Mot de passe : postgres
- Base de données : bank
## Users
- GET 'http://localhost:4000/api/users' -> all users /!\ no time for filter and pagination
- GET 'http://localhost:4000/api/users/:id' -> one user
- DELETE 'http://localhost:4000/api/users/:id' -> delete one user
- POST 'http://localhost:4000/api/users' -> add one user with in the body of the request : {	"username": "quroulon", "firstName": "Quentin", "lastName": "roulon" }
- POST 'http://localhost:4000/api/users' ->  
## Accounts
- GET 'http://localhost:4000/api/accounts' -> all accounts
- POST 'http://localhost:4000/api/accounts' -> add one account linked to one user with in the body of the request : { "amount": 200, "appUserId": 1 }
- GET 'http://localhost:4000/api/operations' -> all operations
## Operations
- GET ''/:userId/accounts/:accountId/operations/add' -> add an operation linked to an account and an user, this modify the amount on the account of the user.
