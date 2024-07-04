import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import moment from 'moment';

// Define the User attributes interface
interface UserAttributes {
  id: number;
  name: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

// Define the User creation attributes interface
type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

// Extend the Sequelize Model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public userId!: string;
  public createdAt!: number;
  public updatedAt!: number;
}

// Initialize the User model
export const initModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  User.beforeCreate(async (user) => {
    user.createdAt = moment().unix();
    user.updatedAt = moment().unix();
  });

  User.beforeUpdate(async (user) => {
    user.updatedAt = moment().unix();
  });

  return User;
};
