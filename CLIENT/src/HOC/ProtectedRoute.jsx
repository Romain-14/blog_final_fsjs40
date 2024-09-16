// HOC pour sécuriser les routes
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// on crée un composant qui prend en paramètre un composant et des props
// on récupère le composant et les props
function ProtectedRoute({ element: Component }) {
	// on récupère les données de l'utilisateur
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();

	// si l'utilisateur n'est pas connecté, on redirige vers la page d'accueil
	useEffect(() => {
		if (!user.isLogged) {
			navigate("/");
		}
	}, [user]);

	// si l'utilisateur est connecté, on retourne le composant
	if (user.isLogged) {
		return <Component />;
	}
}

ProtectedRoute.propTypes = {
	element: PropTypes.elementType.isRequired,
};

// on exporte le composant
export default ProtectedRoute;
