import express from "express";

import * as localController from "../../../controller/auth/local";

const router = express.Router();

/** GET */
router.get("/find", localController.getFind);

/** POST */
router.post("/register", localController.postRegister);
router.post("/login", localController.postLogin);

module.exports = router;
