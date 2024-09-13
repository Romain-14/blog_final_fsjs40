import Avatar from "../model/Avatar.js";

const getAll = async (req, res) => {
    const [avatars] = await Avatar.findAll();
    res.json(avatars);
};



export { getAll };
