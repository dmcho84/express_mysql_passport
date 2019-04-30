import createError from 'http-errors';
import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';

import Routes from 'routes';
import { user as userMiddleware } from 'middleware/auth';
import sequelize from 'config/sequelize';

const app = express();

const API_PORT = process.env.API_PORT || 4000;

require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var whitelist = ['http://localhost:3001', 'http://localhost:4000'];
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// app.options('*', cors({ origin: 'http://localhost:3001' }));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(userMiddleware);

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.use('/', Routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
