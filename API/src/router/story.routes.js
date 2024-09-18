import Router from "express";

import {
	getAll,
	getById,
	addImage,
	create,
	update,
	remove,
} from "../controllers/story.js";
import { addComment } from "../controllers/comment.js";

import withUserAuth from "../middlewares/withUserAuth.js";

const router = Router();

router.get("/all", getAll);
router.get("/:id", getById);

router.post("/addImage", addImage);

router.post("/create", create);
router.post("/:story_id/addComment", withUserAuth, addComment);

router.patch("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
