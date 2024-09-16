import pool from "../config/db.js";

class User {
	static async findAll() {
		const SELECT_ALL = "SELECT user.id, username, role, label as avatar FROM user LEFT JOIN avatar ON user.avatar_id = avatar.id";
		return await pool.query(SELECT_ALL);
	}

    static async findOne(id) {
        const FIND_ONE = "SELECT user.id, username, role, label as avatar FROM user LEFT JOIN avatar ON user.avatar_id = avatar.id WHERE id = ?";
        return await pool.execute(FIND_ONE, [id]);
    }

	static async updateAvatar(avatar, id) {
		const UPDATE_AVATAR = "UPDATE user SET avatar_id = ? WHERE id = ?";
		return await pool.execute(UPDATE_AVATAR, [avatar, id]);
	}
}

export default User;
