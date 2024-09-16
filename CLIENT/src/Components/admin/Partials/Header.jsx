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
			console.log(response);
			if (response.status === 200) {
                const data = await response.json();
                console.log(data)
				dispatch(logout(data.isLogged));
				dispatch(toggleMenu());
				navigate("/");
			}
		}
		fetchLogout();
	}
	return (
		<header>
			<div>
				<nav>
					<Link to="/">Accueil</Link>
				</nav>
			</div>
			<h1>Dashboard panel</h1>
			<button onClick={onClickLogout}>
				<FontAwesomeIcon icon={faPowerOff} />
			</button>
		</header>
	);
}

export default Header;
