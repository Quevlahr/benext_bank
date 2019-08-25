import { sequelize } from '../database/sequelize';
import { Model, DataTypes } from 'sequelize';

class Operation extends Model {
  public amount!: number;
}

Operation.init(
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'operation',
  }
);

export { Operation };
