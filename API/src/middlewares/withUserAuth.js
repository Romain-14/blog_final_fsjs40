// export d'une fonction fonction anonyme "middleware" donc prend en paramètre req, res, next et qui vérifie si l'utilisateur est connecté et si son rôle est "user" pour lui permettre d'accéder à la route

export default (req, res, next) => {
	console.log("i'm the middleware !!!", req.session);
	console.log("i'm the middleware suite -> !!!", req.session.user);
	if (req.session) {
		if (req.session.user.role === "user") {
			next();
		}
	} else {
		res.status(401).json({ msg: "Unauthorized" });
	}
};
