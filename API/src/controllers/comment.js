import Comment from "../model/Comment.js";

const getAllFromStoryId = async (req, res) => {
	try {
		const { id } = req.params;
		const [comments] = await Comment.findAllFromStoryId(id);
        // console.log(comments)
		res.status(200).json(comments);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

export { getAllFromStoryId };
