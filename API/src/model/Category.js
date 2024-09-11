import pool from "../config/db.js";

class Category {
	static async findAll() {
		const SELECT_ALL = "SELECT * FROM category";
		return await pool.query(SELECT_ALL);
	}

	static async findById(id) {
		const SELECT_ONE = "SELECT * FROM category WHERE id = ?";
		return await pool.execute(SELECT_ONE, [id]);
	}

    static async create(label){
        const INSERT = "INSERT INTO category (label) VALUES (?)";
        return await pool.execute(INSERT, [label]);
    }

    static async update(label, id){
        const UPDATE = "UPDATE category SET label = ? WHERE id = ?";
        return await pool.execute(UPDATE, [label, id]);
    }

    static async remove(id){
        const DELETE = "DELETE FROM category WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }
}

export default Category;
