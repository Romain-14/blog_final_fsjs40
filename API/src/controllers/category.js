import Category from "../model/Category.js";

const getAll = async (req, res) => {
	try {
		const [response] = await Category.findAll();
		res.json(response);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const getById = async (req, res) => {
	try {
		const [response] = await Category.findById(req.params.id);
		if (!response.length) {
			res.status(404).json({ msg: "Category not found" });
			return;
		}
		res.json(response[0]);
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const create = async (req, res) => {
	try {
		const [response] = await Category.create(req.body.label);
		res.json({ msg: "Category created", id: response.insertId });
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const update = async (req, res) => {
	try {
		const [response] = await Category.update(req.body.label, req.params.id);
		if (!response.affectedRows) {
			res.status(404).json({ msg: "Category not found" });
			return;
		}
		res.json({ msg: "Category updated", id: req.body.id });
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const remove = async (req, res) => {
    try {
        const [response] = await Category.remove(req.params.id);
        console.log(response)
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Category not found" });
            return;
        }
        console.log(response)
        res.json({ msg: "Category deleted", id: req.params.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
	
};

export { getAll, getById, create, update, remove };
