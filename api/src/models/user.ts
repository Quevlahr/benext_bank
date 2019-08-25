import { sequelize } from '../database/sequelize';
import { Model, DataTypes } from 'sequelize';
import { Account } from './account';
import { Operation } from './operation';

class User extends Model {
  public username!: string;
  public age!: number | null;
  public firstName!: string;
  public lastName!: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'app_user',
  }
);

User.hasMany(Account);
Account.belongsTo(User);

User.hasMany(Operation);
Operation.belongsTo(User);

export { User };
