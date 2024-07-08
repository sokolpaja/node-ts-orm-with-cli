import Profile, {
  ProfileAttributes,
  ProfileCreationAttributes,
} from '@/data/models/profile.model';

export class ProfileService {
  async getAll(): Promise<ProfileAttributes[]> {
    try {
      const profiles = await Profile.findAll();
      return profiles;
    } catch (error) {
      console.log('🚀 ~ ProfileService ~ getAll ~ error:', error);
      throw error;
    }
  }

  async getById(id: string | number): Promise<ProfileAttributes> {
    try {
      const profile = await Profile.findByPk(id);
      if (!profile) {
        throw new Error('Profile not found');
      }
      return profile;
    } catch (error) {
      console.log('🚀 ~ ProfileService ~ getById ~ error:', error);
      throw error;
    }
  }
  async getByUserId(userId: string | number): Promise<ProfileAttributes> {
    try {
      const profile = await Profile.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!profile) {
        return null;
      }
      return profile;
    } catch (error) {
      console.log('🚀 ~ ProfileService ~ getByUserId ~ error:', error);
      throw error;
    }
  }

  async update(
    id: string | number,
    payload: Partial<ProfileCreationAttributes>
  ): Promise<ProfileAttributes> {
    try {
      const profile = await Profile.findByPk(id);
      if (!profile) {
        throw new Error('Profile not found');
      }
      const updatedProfile = await profile.update(payload);
      return updatedProfile;
    } catch (error) {
      console.log('🚀 ~ ProfileService ~ error:', error);
      throw error;
    }
  }

  async create(payload: ProfileCreationAttributes): Promise<ProfileAttributes> {
    try {
      const profile = await Profile.create(payload);
      return profile;
    } catch (error) {
      console.log('🚀 ~ ProfileService ~ create ~ error:', error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<boolean> {
    try {
      const deletedProfileCount = await Profile.destroy({
        where: { id },
      });

      return !!deletedProfileCount;
    } catch (error) {
      console.log('🚀 ~ ProfileService ~ delete ~ error:', error);
      throw error;
    }
  }
}
