import express from 'express';

import apiRouter from './api';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api', apiRouter);

module.exports = router;
