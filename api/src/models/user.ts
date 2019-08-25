import { sequelize } from '../database/sequelize';
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

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

export { User };
