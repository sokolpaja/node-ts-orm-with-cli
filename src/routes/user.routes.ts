import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

const userRoutes = () => {
  // POST - users
  router.post(
    '/',
    [],
    async (req: Request, res: Response, next: NextFunction) => {
      //   userController.createUser(req, res, next)
    }
  );

  router.get('/all', (req: Request, res: Response, next: NextFunction) => {
    console.log('get all post controller');

    // return userController.getAllUsers(req, res, next);
  });

  router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    // userController.getUserById(req, res, next)
  });

  return router;
};

export default userRoutes;
