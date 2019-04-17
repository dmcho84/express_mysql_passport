import express from "express";

import localRouter from "./local";
// import googleRouter from "./google";

const router = express.Router();

router.use("/local", localRouter);

module.exports = router;
