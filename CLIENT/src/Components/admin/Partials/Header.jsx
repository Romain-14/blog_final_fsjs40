import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";

import { logout } from "../../../store/Slices/user";
import { toggleMenu } from "../../../store/Slices/menu";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onClickLogout() {
		async function fetchLogout() {
			const response = await fetch("/api/v1/authentication/logout", {
				method: "POST",
				credentials: "include",
			});
            
			if (response.status === 200) {
                const data = await response.json();
				dispatch(logout(data.isLogged));
				dispatch(toggleMenu());
				navigate("/");
			}
		}
		fetchLogout();
	}
	return (
		<header className="admin">
            <h1>Dashboard</h1>
				<nav>
					<Link to="/user">Utilisateurs</Link>
					<Link to="/story">Articles</Link>
					<Link to="/category">Catégories</Link>
					<Link to="/comment">Commentaires</Link>
				</nav>
			
			<button onClick={onClickLogout} aria-label="Bouton de déconnexion">
				<FontAwesomeIcon icon={faPowerOff} />
			</button>
		</header>
	);
}

export default Header;
