import express from 'express';

import * as localCtrl from './localCtrl';

const router = express.Router();

/** GET */
router.get('/check', localCtrl.getCheck);

/** POST */
router.post('/register', localCtrl.postRegister);
router.post('/login', localCtrl.postLogin);

module.exports = router;
