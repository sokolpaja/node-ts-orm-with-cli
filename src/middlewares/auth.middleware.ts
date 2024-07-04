import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const webToken = authHeader ? authHeader.split(' ')[1] : '';

  if (!webToken) {
    return res.status(401).json({
      status: 401,
      message: 'Authorization Failed !!',
      error: 'Token is missing',
    });
  }

  try {
    jwt.verify(webToken, process.env.JWT_SECRET as string);
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Authorization Failed !!',
      error,
    });
  }
};
