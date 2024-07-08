import Profile from '@/data/models/profile.model';
import User, {
  UserAttributes,
  UserCreationAttributes,
} from '@/data/models/user.model';

export class UserService {
  async getAll(): Promise<UserAttributes[]> {
    try {
      const enquiries = await User.findAll();
      return enquiries;
    } catch (error) {
      console.log('🚀 ~ UserService ~ getAll ~ error:', error);
      throw error;
    }
  }

  async getById(id: string | number): Promise<UserAttributes> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log('🚀 ~ UserService ~ getById ~ error:', error);
      throw error;
    }
  }

  async update(
    id: string | number,
    payload: Partial<UserCreationAttributes>
  ): Promise<UserAttributes> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      const update = await user.update(payload);
      return update;
    } catch (error) {
      console.log('🚀 ~ UserService ~ error:', error);
      throw error;
    }
  }

  async create(payload: UserCreationAttributes): Promise<UserAttributes> {
    console.log('🚀 ~ UserService ~ create ~ payload:', payload);
    try {
      const user = await User.create(payload);
      return user;
    } catch (error) {
      console.log('🚀 ~ UserService ~ create ~ error:', error);
      throw error;
    }
  }

  async getUserProfile(userId: string): Promise<UserAttributes> {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Profile,
            as: 'profile',
          },
        ],
      });
      return user;
    } catch (error) {
      console.log('🚀 ~ UserService ~ getUserProfile ~ error:', error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<boolean> {
    try {
      const deletedCount = await User.destroy({
        where: { id },
      });

      return !!deletedCount;
    } catch (error) {
      console.log('🚀 ~ UserService ~ delete ~ error:', error);
      throw error;
    }
  }
}
