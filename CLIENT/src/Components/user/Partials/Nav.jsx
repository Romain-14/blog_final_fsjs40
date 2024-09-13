import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faRightFromBracket,
	faRightToBracket,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import { toggleMenu } from "../../../store/Slices/menu";
import { logout } from "../../../store/Slices/user";

function Nav() {
	const user = useSelector((state) => state.user);
	const menu = useSelector((state) => state.menu);
	const dispatch = useDispatch();

	const [type, setType] = useState(
		window.innerWidth > 600 ? "tabletAndMore" : "mobile"
	);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 600) {
				setType("tabletAndMore");
				return;
			}
			setType("mobile");
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{type === "mobile" && (
				<button onClick={() => dispatch(toggleMenu())}>
					<img src={"/icons/" + user.avatar} alt="menu" />
				</button>
			)}

			<nav
				className={`nav ${
					type === "mobile" && menu.isOpen ? "burger" : "screen"
				}`}
			>
				<NavLink to={"/"}>
					<FontAwesomeIcon icon={faHome} /> Accueil
				</NavLink>

				{user.isLogged ? (
					<>
						<NavLink to={"/dashboard"}>
							<FontAwesomeIcon icon={faUser} /> profil
						</NavLink>
						<button onClick={() => dispatch(logout())}>
							<FontAwesomeIcon icon={faRightFromBracket} /> Se
							déconnecter
						</button>
					</>
				) : (
					<NavLink to={"login"}>
						<FontAwesomeIcon icon={faRightToBracket} /> Se connecter
					</NavLink>
				)}
			</nav>
		</>
	);
}

export default Nav;
