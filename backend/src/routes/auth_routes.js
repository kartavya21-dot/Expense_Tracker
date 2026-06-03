import express from "express";

import { register, login, getMe } from "../controllers/auth_controller.js";
import protectRoute from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protectRoute, getMe);

export default router;