import { Router } from "express";

import { create, login, logout, check_auth } from "../controllers/auth.js";
import withAuth from "../middlewares/withAuth.js";

const router = Router();

router.post("/register", create);
router.post("/login", login);

router.post("/logout", withAuth, logout);

// route pour vérifier si l'user est connecté
router.get("/check-auth", withAuth, check_auth);

export default router;
