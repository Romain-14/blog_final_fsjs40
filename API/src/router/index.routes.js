import { Router } from "express";

import story_routes from "./story.routes.js";
import category_routes from "./category.routes.js";

const router = Router();

// router.get("/", (req, res) => {
//     res.json({ msg: "API is working" });
// });

router.use("/story", story_routes);
router.use("/category", category_routes);

router.get("*", (req, res) => {
	res.status(404).json({ msg: "Page not found" });
});

export default router;
