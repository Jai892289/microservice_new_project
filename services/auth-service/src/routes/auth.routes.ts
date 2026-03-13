import { Router } from "express";
import { login, refreshTokenController, register } from "../controllers/auth.controller.";


const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refreshTokenController);

export default router;