import pool from "../config/db.js";

class Auth {
	static async create(datas) {
		const INSERT = "INSERT INTO user (username, password) VALUES (?, ?)";
		return await pool.execute(INSERT, [ ...Object.values(datas)] );
	}

	static async findOneByUsername(username) {
		const SELECT =
			"SELECT id, username, password FROM `user` WHERE username = ?";
            return await pool.execute(SELECT, [username]);
	}

    static async findUserInfoById(id){
        const SELECT = "SELECT username, role, label AS avatar FROM user LEFT JOIN avatar ON user.avatar_id = avatar.id WHERE user.id = ?";
        return await pool.execute(SELECT, [id]);
    }
}



export default Auth;