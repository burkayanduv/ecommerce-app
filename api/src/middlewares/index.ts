import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecretKey: string = process.env.JWT_SECRET_KEY as string;

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader: string = req.headers.token as string;
  if (authHeader) {
    const token: string = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecretKey, (err) => {
      if (err) {
        res.status(403).json('Token is not valid');
      } else {
        res.locals.user = jwt.decode(token);
        next();
      }
    });
  } else {
    res.sendStatus(401).json({ message: 'No auth token provided' });
  }
};

export const verifyTokenAndAuthorization = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  verifyToken(req, res, () => {
    if (res.locals.user.id === req.params.id || res.locals.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'You are not authorized' });
    }
  });
};

export const verifyTokenAndAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  verifyToken(req, res, () => {
    if (res.locals.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'You are not authorized' });
    }
  });
};
