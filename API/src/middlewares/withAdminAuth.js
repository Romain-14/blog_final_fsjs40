export default (req, res, next) => {
	console.log("ADMIN MIDDLEWARE", req.session.user);
	if (req.session.user) {
		if (req.session.user.role === "admin") {
			next();
		}
	}
	// if(req.session.user || req.session.user.role !== "admin") res.status(401).json({ msg: "Unauthorized" });
};
