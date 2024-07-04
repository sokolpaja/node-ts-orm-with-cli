import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();
// const postController = new PostController();

const postRoutes = () => {
  // TODO get post
  //   router.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  //     postController.getUserById(req, res, next)
  //   );

  // TODO get posts
  router.get('/all', (req: Request, res: Response, next: NextFunction) => {
    console.log('🚀 ~ postRoutes ~ all:');
    // return postController.getPosts(req, res, next);
  });

  // POST - posts;
  router.post(
    '/',
    [],
    async (req: Request, res: Response, next: NextFunction) => {
      //   postController.createPost(req, res, next)
    }
  );
  return router;
};

export default postRoutes;
