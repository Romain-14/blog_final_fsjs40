export default (req, res, next) => {
    console.log("middleware ADMIN !!!", req.session);
    if (req.session.user && req.session.user.role === "admin") {
        return next();
    }

    res.status(401).json({ msg: "Unauthorized" });
};
