import passport from 'passport';
import jwt from 'jsonwebtoken';

import jwtSecret from 'config/jwtConfig';
import models from 'config/sequelize';

export const postLogin = async (req, res, next) => {
  try {
    passport.authenticate('login', (err, user, info) => {
      if (err) console.log(err);
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          models.User.findOne({
            where: {
              email: user.email,
            },
          }).then(user => {
            const token = jwt.sign({ email: user.email }, jwtSecret.secret);
            console.log({ user });
            res.status(200).send({
              auth: true,
              token,
              message: 'user found & logged in',
            });
          });
        });
      }
    })(req, res, next);
  } catch (err) {
    console.log(err);
  }
};

export const getCheck = async (req, res, next) => {
  console.log(req);
  try {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) console.log(err);
      if (info !== undefined) {
        console.log('info.message', info.message);
        res.send({ error: { status: 401, message: info.message } });
      } else {
        console.log('user found in db from route');
        const resData = {
          auth: true,
          message: 'user found in db',
          data: {
            email: user.email,
            name: user.name,
          },
        };
        console.log({ resData });
        res.status(200).send(resData);
      }
    })(req, res, next);
  } catch (err) {
    console.log(err);
  }
};

export const postRegister = async (req, res, next) => {
  const { body } = req;
  console.log({ body });
  try {
    passport.authenticate('register', (err, user, info) => {
      if (err) console.log(err);
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const data = {
            email: req.body.email,
            name: req.body.name,
          };

          models.User.findOne({
            where: {
              email: data.email,
            },
          }).then(user => {
            user
              .update({
                email: data.email,
                name: data.name,
              })
              .then(async () => {
                console.log('user created in db', user);
                const token = jwt.sign({ email: user.email }, jwtSecret.secret);

                await models.Category.create({
                  name: '샘플',
                  identity: 'sample',
                  UserId: user.get('id'),
                }).then(async () => {
                  const categories = await models.Category.findAll({
                    where: {
                      UserId: user.id,
                    },
                  });

                  res.status(200).send({ token, message: 'user created' });
                });
              });
          });
        });
      }
    })(req, res, next);
  } catch (err) {
    console.log(err);
  }
};
