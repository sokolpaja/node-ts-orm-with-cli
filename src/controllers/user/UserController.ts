import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import BaseController from '../BaseController';
import { UserService } from './UserService';
import { RouteDefinition } from '@/types/RoutesDefinitions';
import { UserAttributes } from '@/data/models/user.model';

/**
 * Enquiry controller
 */
export default class UserController extends BaseController {
  private user: UserService;
  public basePath = 'users';

  constructor() {
    super();
    this.user = new UserService();
  }

  /**
   * The routes method returns an array of route definitions for CRUD operations
   * (GET, POST, PUT, DELETE) on enquiries,
   * with corresponding handlers bound to the controller instance.
   */
  public routes(): RouteDefinition[] {
    return [
      { path: '/', method: 'get', handler: this.getUsers.bind(this) },
      {
        path: '/:id',
        method: 'get',
        handler: this.getUser.bind(this),
      },
      {
        path: '/profile/:id',
        method: 'get',
        handler: this.getUserProfile.bind(this),
      },
      {
        path: '/',
        method: 'post',
        handler: this.createUser.bind(this),
      },
      {
        path: '/:id',
        method: 'put',
        handler: this.updateUser.bind(this),
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
  public async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: UserAttributes[] = await this.user.getAll();
      res.locals.data = users;
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
  public async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const user: UserAttributes = await this.user.getById(id);
      res.locals.data = user;
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
  public async getUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const user: UserAttributes = await this.user.getUserProfile(id);
      res.locals.data = user;
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
  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const { body } = req;
      const user: UserAttributes = await this.user.update(id, body);
      res.locals.data = {
        user,
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
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, userId } = req.body;
      if (!name || !userId) {
        console.log('fields name and userId required');
        res.send('Some fields are required!');
      }
      const user: UserAttributes = await this.user.create({
        name,
        userId,
      });
      res.locals.data = {
        user,
        userId,
      };
      // call base class method
      super.send(res, StatusCodes.CREATED);
    } catch (err) {
      super.send(err, StatusCodes.INTERNAL_SERVER_ERROR);
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
      const status: boolean = await this.user.delete(id);
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
