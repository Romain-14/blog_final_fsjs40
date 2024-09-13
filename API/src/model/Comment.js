import pool from "../config/db.js";


class Comment {
    static async findAllFromStoryId(id) {
        const SELECT_ALL = "SELECT * FROM comment WHERE story_id = ?";
        return await pool.execute(SELECT_ALL, [id]);
    }

    // static async findById(id) {
    //     const SELECT_ONE = "SELECT * FROM comment WHERE id = ?";
    //     return await pool.execute(SELECT_ONE, [id]);
    // }

    // static async create(datas){
    //     const INSERT = "INSERT INTO comment (content, story_id) VALUES (?, ?)";
    //     return await pool.execute(INSERT, [...Object.values(datas)]);
    // }

    // static async update(content, id){
    //     const UPDATE = "UPDATE comment SET content = ? WHERE id = ?";
    //     return await pool.execute(UPDATE, [content, id]);
    // }

    // static async remove(id){
    //     const DELETE = "DELETE FROM comment WHERE id = ?";
    //     return await pool.execute(DELETE, [id]);
    // }
}

export default Comment;