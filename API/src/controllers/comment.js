import Comment from "../model/Comment.js";

const getAllFromStoryId = async (req, res) => {
	try {
		const { id } = req.params;
		const [comments] = await Comment.findAllFromStoryId(id);
		res.status(200).json(comments);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const addComment = async (req, res) => {
	try {
		const { message, parent_id } = req.body;
		const data = {
			user_id: req.session.user.id,
			story_id: parseInt(req.params.story_id),
			message,
			parent_id,
		};

		const [result] = await Comment.addCommentToStory(data);
		if (result.affectedRows === 0)
			throw new Error("Impossible d'ajouter le commentaire");
		res.status(201).json({ msg: "Votre commentaire a bien été envoyé !" });
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

export { getAllFromStoryId, addComment };
