import { Router } from "express";

import story_routes from "./story.routes.js";
import comment_routes from "./comment.routes.js";
import category_routes from "./category.routes.js";
import auth_routes from "./auth.routes.js";

const router = Router();

// router.get("/", (req, res) => {
//     res.json({ msg: "API is working" });
// });

router.use("/story", story_routes);
router.use("/comment", comment_routes);
router.use("/category", category_routes);
router.use("/authentication", auth_routes);

router.get("*", (req, res) => {
	res.status(404).json({ msg: "Page not found" });
});

export default router;
