import pool from "../config/db.js";

class Story {
	static async findAll() {
		const SELECT_ALL = "SELECT story.id, title, content, publishDate, author, label, JSON_ARRAYAGG(image.url) AS images FROM story JOIN category ON story.category_id = category.id JOIN image ON story.id = image.story_id GROUP BY title";
		return await pool.query(SELECT_ALL);
	}

	static async findById(id) {
		const SELECT_ONE = "SELECT story.id, title, content, publishDate, author, label,JSON_ARRAYAGG(image.url) AS images FROM story JOIN category ON story.category_id = category.id JOIN image ON story.id = image.story_id GROUP BY title HAVING story.id = ?";
		return await pool.execute(SELECT_ONE, [id]);
	}

    static async addImage(url, story_id){
        console.log(url, story_id);
        const INSERT = "INSERT INTO image (url, story_id) VALUES (?, ?)";
        return await pool.execute(INSERT, [url, story_id]);
    }

    static async create(datas){
        const INSERT = "INSERT INTO story (title, content, category_id) VALUES (?, ?, ?)";
        // Object.values(data) => [title, content, category_id]
        // Object permets de manipuler les objets en JS
        // values permet de récupérer les valeurs sous forme de tableau 
        return await pool.execute(INSERT, [...Object.values(datas)]);
    }

    static async update(title, content, id){
        const UPDATE = "UPDATE story SET title = ?, content = ? WHERE id = ?";
        return await pool.execute(UPDATE, [title, content, id]);
    }

    static async remove(id){
        const DELETE = "DELETE FROM story WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }
}

export default Story;
