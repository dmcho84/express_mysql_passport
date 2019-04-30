import passport from 'passport';
import jwt from 'jsonwebtoken';

import jwtSecret from 'config/jwtConfig';
import models from 'config/sequelize';

export const isLoggedIn = (req, res, next) => {
  console.log('loggedIn:', req.user ? true + req.user.email : false);
  if (!req.user) res.status(401).json({ message: 'Unauthorized' });
  return next();
};

export const user = async (req, res, next) => {
  try {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      req.user = null;
      if (err) console.log(err);
      if (info !== undefined) {
        console.log(info.message);
      } else {
        req.user = user;
      }

      return next();
    })(req, res, next);
  } catch (err) {
    console.log(err);
  }
};
