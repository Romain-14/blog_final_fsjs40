import Router from "express";

import {
	getAll,
	getById,
    addImage,
	create,
	update,
	remove,
} from "../controllers/story.js";

const router = Router();

router.get("/all", getAll);
router.get("/:id", getById);

router.post("/addImage", addImage);

router.post("/create", create);
router.patch("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
