import { Router } from "express";

import { create, login, logout } from "../controllers/auth.js";

const router = Router();

router.post("/register", create);
router.post("/login", login);

router.post("/logout", logout);

// route pour vérifier si l'user est connecté
router.post("/check-auth", (req, res) => {
	const { user } = req.session;
    console.log("check-auth", user)
	if (user) {
		// si user existe
		res.status(200).json({ auth: true, user });
	} else {
		res.status(401).json({ auth: false });
	}
});

export default router;
