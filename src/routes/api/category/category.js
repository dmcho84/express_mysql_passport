import express from 'express';

import { isLoggedIn } from 'middleware/auth';
import * as categoryCtrl from './categoryCtrl';

const router = express.Router();

/** GET */
router.get('/', isLoggedIn, categoryCtrl.getCategory);
router.get('/list', categoryCtrl.getCategories);

/** POST */
router.post('/', isLoggedIn, categoryCtrl.postCategory);

module.exports = router;
