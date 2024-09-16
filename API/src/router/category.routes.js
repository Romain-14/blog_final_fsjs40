import Router from "express";

import {
	getAll,
	getById,
	create,
	update,
	remove,
} from "../controllers/category.js";

import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = Router();

router.get("/list", getAll);
router.get("/:id", getById);

router.post("/create", withAdminAuth, create);
router.patch("/update/:id", withAdminAuth, update);
router.delete("/delete/:id", withAdminAuth, remove);

export default router;
