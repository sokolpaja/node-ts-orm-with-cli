import { Sequelize, DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import moment from 'moment';

// Define the User attributes interface
export interface UserAttributes {
  id?: string;
  name: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the User creation attributes interface
export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

// Extend the Sequelize Model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id: string;
  public name!: string;
  public userId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models) {
    User.hasOne(models.Profile, { foreignKey: 'user_id', as: 'profile' });
  }

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: UUIDV4(),
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
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: true,
      }
    );

    User.beforeCreate(async (user) => {
      user.createdAt = moment().toDate();
      user.updatedAt = moment().toDate();
    });

    User.beforeUpdate(async (user) => {
      user.updatedAt = moment().toDate();
    });

    return User;
  }
}

export default User;
