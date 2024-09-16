import User from '../model/User.js';


const getAll = async (req, res) => {
    const [users] = await User.findAll();
    console.log(users)
    res.json(users);
}

const updateAvatar = async (req, res) => {
    const { id } = req.session.user;
    const { avatar_id } = req.params;
    const [response] = await User.updateAvatar(avatar_id, id);
    
    if(response.affectedRows === 1) {
        const [[avatar]] = await User.findOne(avatar_id);
        req.session.user.avatar = avatar.label;
        res.json({ msg: "Avatar updated", newAvatar: avatar.label  });
    } else 
    res.status(500).json({ msg: "Avatar not updated"});
    
}

export { getAll, updateAvatar };