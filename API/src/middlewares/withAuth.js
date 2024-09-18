export default (req, res, next) => {
    console.log("middleware !!!", req.session);
    if (req.session.user) {
        return next();
    }
    res.status(401).json({ msg: "Unauthorized" });
}