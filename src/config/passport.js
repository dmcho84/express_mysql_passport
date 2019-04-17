import jwtSecret from "./jwtConfig";
import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const models = require("../sequelize");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.deserializeUser((user, done) => {
  console.log(`deserializeUser - user`, user);
  // models.User.findOne({ where: { userId: user } }).then(userInfo => {
  //   let userData =
  //     userInfo && userInfo.dataValues ? userInfo.dataValues : null;
  //   console.log(`deserializeUser - userData`, userData);
  //   // req.user = userData;
  //   done(null, userData);
  // });
});

passport.use(
  "register",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      try {
        models.User.findOne({
          where: {
            email
          }
        }).then(user => {
          if (user !== null) {
            console.log("email already taken");
            return done(null, false, { message: "email already taken" });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashhedPassword => {
              models.User.create({ email, password: hashhedPassword }).then(
                user => {
                  console.log("user created");
                  return done(null, user);
                }
              );
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      try {
        models.User.findOne({
          where: {
            email
          }
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: "bad email" });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log("passwords do not match");
                return done(null, false, { message: "passwords do not match" });
              }
              console.log("user found & authenticated");
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.secret
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      console.log({ jwt_payload });
      models.User.findOne({ where: { email: jwt_payload.email } }).then(
        user => {
          if (user) {
            console.log("user found in db in passport");
            done(null, user);
          } else {
            console.log("user not found in db");
            done(null, false);
          }
        }
      );
    } catch (err) {
      done(err);
    }
  })
);
