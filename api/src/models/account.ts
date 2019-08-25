import { sequelize } from '../database/sequelize';
import { Model, DataTypes } from 'sequelize';
import { Operation } from './operation';

class Account extends Model {
  public amount!: number;
}

Account.init(
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'account',
  }
);

Account.hasMany(Operation);
Operation.belongsTo(Account);

export { Account };
