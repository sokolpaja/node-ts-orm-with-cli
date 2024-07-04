import express, { Request, Response } from 'express';
import userRoutes from './user.routes';
import postRoutes from './post.routes';

const router = express.Router();

export const routes = () => {
  router.get('/api', (req: Request, res: Response) => {
    res.send('node api is live!');
  });
  router.use('/api/users', userRoutes());
  router.use('/api/posts', postRoutes());

  return router;
};
