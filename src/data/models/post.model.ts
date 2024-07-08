import { Sequelize, DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import moment from 'moment';

// Define the User attributes interface
export interface PostAttributes {
  id: number;
  name: string;
  content: string;
  profile_id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User creation attributes interface
export type PostCreationAttributes = Optional<
  PostAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

// Extend the Sequelize Model class
class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: number;
  public name!: string;
  public content!: string;
  public profile_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models) {
    Post.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'profile' });
  }
  static initModel(sequelize: Sequelize) {
    Post.init(
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
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        profile_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'profile',
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
        modelName: 'Post',
        tableName: 'post',
        timestamps: true,
      }
    );

    Post.beforeCreate(async (post) => {
      post.createdAt = moment().toDate();
      post.updatedAt = moment().toDate();
    });

    Post.beforeUpdate(async (post) => {
      post.updatedAt = moment().toDate();
    });

    return Post;
  }
}

export default Post;
