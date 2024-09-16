import { Router } from "express";
import { updateAvatar } from "../controllers/user.js";

import withUserAuth from "../middlewares/withUserAuth.js";

const router = Router()

// avant d'accéder au controller de modification de l'avatar on effectuer coté back une vérification supplémentaire, en ajoutant une couche de sécurité avec le middleware withUserAuth (voir ce fichier)
// si tout va bien (next()) on pass à cette fonction controller "updateAvatar"
router.patch("/avatar/:avatar_id", withUserAuth, updateAvatar);

export default router