import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

const profileRoutes = () => {
  // POST - Profile
  router.post(
    '/',
    [],
    async (req: Request, res: Response, next: NextFunction) => {
      //   profileController.createProfile(req, res, next)
    }
  );

  router.get('/all', (req: Request, res: Response, next: NextFunction) => {
    console.log('get all post controller');

    // return profileController.getAllProfiles(req, res, next);
  });

  router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    // profileController.getProfileById(req, res, next)
  });

  return router;
};

export default profileRoutes;
