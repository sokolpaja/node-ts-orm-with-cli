import { Sequelize, DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import moment from 'moment';

// Define the User attributes interface
export interface ProfileAttributes {
  id?: string;
  name: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User creation attributes interface
export type ProfileCreationAttributes = Optional<
  ProfileAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

// Extend the Sequelize Model class
class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id: string;
  public name!: string;
  public user_id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models) {
    Profile.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Profile.hasMany(models.Post, { foreignKey: 'profile_id', as: 'posts' });
  }
  static initModel(sequelize: Sequelize) {
    Profile.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id',
          },
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
        modelName: 'Profile',
        tableName: 'profile',
        timestamps: true,
      }
    );

    Profile.beforeCreate(async (profile) => {
      profile.createdAt = moment().toDate();
      profile.updatedAt = moment().toDate();
    });

    Profile.beforeUpdate(async (profile) => {
      profile.updatedAt = moment().toDate();
    });
    return Profile;
  }
}
export default Profile;
