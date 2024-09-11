import Router from "express";

import {
	getAll,
	getById,
	create,
	update,
	remove,
} from "../controllers/category.js";

const router = Router();

router.get("/all", getAll);
router.get("/:id", getById);

router.post("/create", create);
router.patch("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
