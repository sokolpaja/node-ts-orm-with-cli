import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import BaseController from '../BaseController';
import { ProfileService } from './ProfileService';
import { RouteDefinition } from '@/types/RoutesDefinitions';
import { ProfileAttributes } from '@/data/models/profile.model';

/**
 * Enquiry controller
 */
export default class ProfileController extends BaseController {
  private profile: ProfileService;
  public basePath = 'profiles';

  constructor() {
    super();
    this.profile = new ProfileService();
  }

  /**
   * The routes method returns an array of route definitions for CRUD operations
   * (GET, POST, PUT, DELETE) on enquiries,
   * with corresponding handlers bound to the controller instance.
   */
  public routes(): RouteDefinition[] {
    return [
      { path: '/', method: 'get', handler: this.getProfiles.bind(this) },
      {
        path: '/:id',
        method: 'get',
        handler: this.getProfile.bind(this),
      },
      {
        path: '/',
        method: 'post',
        handler: this.createProfile.bind(this),
      },
      {
        path: '/user-id/:id',
        method: 'get',
        handler: this.getProfileByUserId.bind(this),
      },
      {
        path: '/:id',
        method: 'put',
        handler: this.updateProfile.bind(this),
      },
      { path: '/:id', method: 'delete', handler: this.delete.bind(this) },
    ];
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async getProfiles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const enquiries: ProfileAttributes[] = await this.profile.getAll();
      res.locals.data = enquiries;
      // call base class method
      this.send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const profile: ProfileAttributes = await this.profile.getById(id);
      res.locals.data = profile;
      // call base class method
      this.send(res);
    } catch (err) {
      next(err);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async getProfileByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;

      const profile: ProfileAttributes = await this.profile.getByUserId(id);
      res.locals.data = profile;
      // call base class method
      this.send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const { body } = req;
      const profile: ProfileAttributes = await this.profile.update(id, body);
      res.locals.data = {
        profile,
      };
      // call base class method
      this.send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async createProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, userId, email } = req.body;
      console.log('🚀 ~ ProfileController ~ name, userId,:', { name, userId });
      if (!email && !userId) {
        res.send('Some fields are required');
      }
      const existingProfile = await this.profile.getByUserId(userId);
      console.log('🚀 ~ ProfileController ~ existingProfile:', existingProfile);

      if (existingProfile) {
        res.locals.data = {
          profile: existingProfile,
        };
      } else {
        const profile: ProfileAttributes = await this.profile.create({
          name,
          user_id: userId,
        });
        res.locals.data = {
          profile,
        };
      }

      // call base class method
      super.send(res, StatusCodes.CREATED);
    } catch (err) {
      console.log('🚀 ~ ProfileController ~ err:', err);
      next(err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const status: boolean = await this.profile.delete(id);
      res.locals.data = {
        status,
      };
      // call base class method
      this.send(res);
    } catch (err) {
      next(err);
    }
  }
}
