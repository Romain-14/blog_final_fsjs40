import Auth from "../model/Auth.js";
import bcrypt from "bcrypt";

const SALT = 10;

const create = async (req, res) => {
	try {
		const { username, password } = req.body;
        const [[user]] = await Auth.findOneByUsername(username);
        
        if(!user){
            const hash = await bcrypt.hash(password, SALT);
            const [response] = await Auth.create({ username, hash });
            
            if(response.affectedRows === 1){
                res.status(201).json({ msg: "User created" });
            } else {
                res.status(500).json({ msg: "User not created" });
            }
        } 
        if(user){
            res.status(400).json({ msg: "User already exists" });
        }
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const [[user]] = await Auth.findOneByUsername(username);
    
        if(!user){
            res.status(400).json({ msg: "User not found" });
        }
        if(user){            
            const match = await bcrypt.compare(password, user.password);
            if(match){
                const [[userInfos]] = await Auth.findUserInfoById(user.id);
                req.session.user = userInfos;
                res.status(200).json({ msg: "User logged in", userInfos });
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        }

    } catch(err){
        res.status(500).json({ msg: err });
    }
}

export { create, login };
