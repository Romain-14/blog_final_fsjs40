import { Router } from "express";
import { getAll } from "../controllers/avatar.js";

const router = Router();

router.get("/all", getAll);


export default router