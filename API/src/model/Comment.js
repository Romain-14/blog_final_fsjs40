import pool from "../config/db.js";


class Comment {
    static async findAllFromStoryId(id) {
        const SELECT_ALL = `SELECT comment.id, user_id, story_id, message, comment.publishDate, parent_id, username, avatar.label AS avatar FROM comment JOIN user ON comment.user_id = user.id LEFT JOIN avatar ON user.avatar_id = avatar.id  WHERE story_id = ? `;
        return await pool.execute(SELECT_ALL, [id]);
    }

    static async addCommentToStory(datas){
        const INSERT = "INSERT INTO comment (user_id, story_id, message, parent_id) VALUES (?, ?, ?, ?)";
        return await pool.execute(INSERT, [...Object.values(datas)]);
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