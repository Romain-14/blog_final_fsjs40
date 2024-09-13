import { Router } from "express";
import { updateAvatar } from "../controllers/user.js";

const router = Router()


router.patch("/avatar/:avatar_id", updateAvatar);

export default router