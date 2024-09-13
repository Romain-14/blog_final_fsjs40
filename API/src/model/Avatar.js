
import pool from "../config/db.js";

class Avatar{    
    static async findAll() {
        const SELECT_ALL = "SELECT * FROM avatar";
        return await pool.query(SELECT_ALL);
    }
}

export default Avatar;