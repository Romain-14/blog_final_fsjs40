import fs from "fs";
import path from "path";
import formidable from "formidable";

import Story from "../model/Story.js";

const getAll = async (req, res) => {
	try {
		const [response] = await Story.findAll();
		res.json(response);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const getById = async (req, res) => {
	try {
		const [response] = await Story.findById(req.params.id);
		if (!response.length) {
			res.status(404).json({ msg: "Story not found" });
			return;
		}
		res.json(response[0]);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const addImage = (req, res) => {
	try {
		const form = formidable({ multiples: true });
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.status(400).json({ msg: err.message });
				return;
			}
			for (const img of files.img) {
				const oldPath = img.filepath;
				const newPath = path.join(
					process.cwd(),
					"public",
					"img",
					img.originalFilename
				);
				fs.copyFile(oldPath, newPath, async (err) => {
					if (err) {
						res.status(500).send(err);
						return;
					}
					const [response] = await Story.addImage(
						img.originalFilename,
						fields.story_id[0]
					);
					if (!response.affectedRows) {
						res.status(404).json({ msg: "Image not added" });
						return;
					}
				});
			}
			res.json({ msg: "Image added" });
		});
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const create = (req, res) => {
	try {
		const form = formidable({ multiples: true });
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.status(400).json({ msg: err.message });
				return;
			}

			const storyData = {
				title: fields.title[0],
				content: fields.content[0],
				category_id: fields.category_id[0],
			};

			const [storyResponse] = await Story.create(storyData);
			const storyId = storyResponse.insertId;

			for (const img of files.img) {
				const oldPath = img.filepath;
				const newPath = path.join(
					process.cwd(),
					"public",
					"img",
					img.originalFilename
				);
				fs.copyFile(oldPath, newPath, async (err) => {
					if (err) {
						res.status(500).send(err);
						return;
					}
					const [imageResponse] = await Story.addImage(
						img.originalFilename,
						storyId
					);
					if (!imageResponse.affectedRows) {
						res.status(404).json({ msg: "Image not added" });
						return;
					}
				});
			}

			res.json({ msg: "Story and images added", id: storyId });
		});
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const update = async (req, res) => {
    try {
        const [response] = await Story.update(req.body.title, req.body.content, req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Story not updated" });
            return;
        }
        res.json({ msg: "Story updated" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const remove = async (req, res) => {
    try {
        const [response] = await Story.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Story not deleted" });
            return;
        }
        res.json({ msg: "Story deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export { getAll, getById, addImage, create, update, remove };
