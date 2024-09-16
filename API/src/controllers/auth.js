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
                const [[userByID]] = await Auth.findUserInfoById(user.id);
                console.log(userByID)
                req.session.user = {id: user.id, ...userByID};
                
                res.status(200).json({ msg: "User logged in", isLogged: true, user: userByID });
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        }

    } catch(err){
        res.status(500).json({ msg: err });
    }
}

const logout = async (req, res) => {
    try{
        // destruction de la session en BDD (store sql)
        req.session.destroy();
        // suppression du cookie de session
        res.clearCookie("connect.sid");
        res.status(200).json({ msg: "User logged out", isLogged: false });
    } catch(err){
        res.status(500).json({ msg: err });
    }
}

const check_auth = async (req, res) => {
	const { user } = req.session;
    // console.log("check-auth", user)
	if (user) {
		// si user existe
		res.json({ isLogged: true, user });
	} else {
		res.status(401).json({ isLogged: false });
	}
}

export { create, login, logout, check_auth };
