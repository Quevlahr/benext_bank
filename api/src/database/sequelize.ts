import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// The password should not be versioned
const sequelize = new Sequelize('bank', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Synchronize the database with the models /!\ not in production
sequelize.sync();

console.log('une seule fois');
export { sequelize };
