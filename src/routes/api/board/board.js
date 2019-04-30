import express from 'express';

import { isLoggedIn } from 'middleware/auth';
import { bodyCheck, doIHaveInDB } from 'middleware/request';
import * as boardCtrl from './boardCtrl';

const router = express.Router();

/** GET */
// router.get('/list', isLoggedIn, boardCtrl.getBoardList);
router.get('/list', boardCtrl.getBoardListFromEmail);

/** POST */
router.post(
  '/',
  isLoggedIn,
  bodyCheck(['title', 'content', 'categoryId']),
  (req, res, next) =>
    doIHaveInDB('Category', {
      id: req.body.categoryId,
      UserId: req.user.get('id'),
    })(req, res, next),
  boardCtrl.postBoard,
);

module.exports = router;
