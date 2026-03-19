import express from "express";
import { register, login } from "../controllers/auth.controller";
import { refresh, logout } from "../controllers/auth.controller";

const router = express.Router();

// routes
router.post("/register", register);
router.post("/login", login);


router.post("/refresh", refresh);
router.post("/logout", logout);
export default router;
