import Router from "express";

import {
    getAllFromStoryId,
} from "../controllers/comment.js";

const router = Router();

router.get("/all-from-story/:id", getAllFromStoryId);


export default router;
