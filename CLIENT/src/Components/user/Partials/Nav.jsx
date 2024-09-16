import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faRightFromBracket,
	faRightToBracket,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, NavLink } from "react-router-dom";

import { toggleMenu } from "../../../store/Slices/menu";
import { logout } from "../../../store/Slices/user";

function Nav() {
	const user = useSelector((state) => state.user);
	const menu = useSelector((state) => state.menu);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
						<button onClick={onClickLogout}>
							<FontAwesomeIcon icon={faRightFromBracket} />
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
