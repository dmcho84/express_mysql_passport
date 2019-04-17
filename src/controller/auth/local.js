import passport from "passport";
import jwt from "jsonwebtoken";

import jwtSecret from "../../config/jwtConfig";
import models from "../../sequelize";

// export const getUsers = async (req, res, next) => {
//   const users = await models.User.findAll();
//   console.log({ users });
//   res.status(200).json(users);
// };

// export const getUser = async (req, res, next) => {
//   const { id } = req.params;
//   const user = await models.User.findOne({ where: { id } });
//   res.status(200).json(user);
// };

export const postLogin = async (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) console.log(err);
    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
        models.User.findOne({
          where: {
            email: user.email
          }
        }).then(user => {
          const token = jwt.sign({ email: user.email }, jwtSecret.secret);
          console.log({ user });
          res.status(200).send({
            auth: true,
            token,
            message: "user found & logged in"
          });
        });
      });
    }
  })(req, res, next);
};

export const getFind = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) console.log(err);
    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      console.log("user found in db from route");
      res.status(200).send({
        auth: true,
        message: "user found in db",
        data: {
          email: user.email,
          name: user.name
        }
      });
    }
  })(req, res, next);
};

export const postRegister = async (req, res, next) => {
  const { body } = req;
  console.log({ body });
  passport.authenticate("register", (err, user, info) => {
    if (err) console.log(err);
    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
        const data = {
          email: req.body.email,
          name: req.body.name
        };
        models.User.findOne({
          where: {
            email: data.email
          }
        }).then(user => {
          user
            .update({
              email: data.email,
              name: data.name
            })
            .then(async () => {
              console.log("user created in db", user);
              const token = jwt.sign({ email: user.email }, jwtSecret.secret);
              await models.Category.create({
                name: "샘플",
                identity: "sample",
                UserId: user.get("id")
              }).then(async () => {
                const categories = await models.Category.findAll({
                  where: {
                    UserId: user.id
                  }
                });
                res
                  .status(200)
                  .send({ token, message: "user created", categories });
              });
            });
        });
      });
    }
  })(req, res, next);
};

export const isLoggedIn = (req, res, next) => {
  console.log("loggedIn:", req.user ? true + req.user.email : false);
  if (!req.user) res.status(401).json({ message: "Unauthorized" });
  return next();
};

export const userMiddleware = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    req.user = null;
    if (err) console.log(err);
    if (info !== undefined) {
      console.log(info.message);
    } else {
      req.user = user;
      console.log("user found in db from route");
    }

    return next();
  })(req, res, next);
};
