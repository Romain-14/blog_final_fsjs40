import Router from "express";

import {
    getAllFromStoryId
	// getAll,
	// getById,
	// create,
	// update,
	// remove,
} from "../controllers/comment.js";

const router = Router();

// router.get("/all", getAll);
router.get("/all-from-story/:id", getAllFromStoryId);

// router.post("/create", create);
// router.patch("/update/:id", update);
// router.delete("/delete/:id", remove);

export default router;
