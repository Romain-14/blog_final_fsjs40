import pool from "../config/db.js";

class User {
	static async findAll() {
		const UPDATE_AVATAR = "UPDATE user SET avatar_id = ? WHERE id = ?";
		await pool.execute(UPDATE_AVATAR, [avatar, id]);
	}

    static async findOne(id) {
        const FIND_ONE = "SELECT label FROM avatar WHERE id = ?";
        return await pool.execute(FIND_ONE, [id]);
    }

	static async updateAvatar(avatar, id) {
		const UPDATE_AVATAR = "UPDATE user SET avatar_id = ? WHERE id = ?";
		return await pool.execute(UPDATE_AVATAR, [avatar, id]);
	}
}

export default User;
