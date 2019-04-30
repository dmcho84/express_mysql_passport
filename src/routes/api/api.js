import express from 'express';

import authRouter from './auth';
import categoryRouter from './category';
import boardRouter from './board';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/board', boardRouter);

module.exports = router;
