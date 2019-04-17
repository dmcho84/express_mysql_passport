import express from "express";

import { isLoggedIn } from "../../controller/auth/local";
import * as categoryCtrl from "../../controller/category";

const router = express.Router();

/** GET */
router.get("/", isLoggedIn, categoryCtrl.readCategory);
router.get("/list", categoryCtrl.readCategories);

/** POST */
router.post("/", isLoggedIn, categoryCtrl.createCategory);

module.exports = router;
