import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleMenu } from "../../store/Slices/menu";
import { setMsg, updateField } from "../../store/Slices/user";
import Form from "./Partials/Form";

// instructions quasi identiques à celle de Login.jsx 
function Register() {
	const menu = useSelector((state) => state.menu);
	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (menu.isOpen) dispatch(toggleMenu());
        return () => {
            dispatch(updateField({username: user.username, password: ""}));
        }
	}, []);

	async function submitHandler(e) {
		e.preventDefault();
		if (!user.username || !user.password) {
			setMsg("Remplissez tous les champs");
			return;
		}
		const response = await fetch("/api/v1/authentication/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (response.status === 201) {
			navigate("/login");
		} else {
			const data = await response.json();
			dispatch(setMsg(data.msg));
		}
	}

	return (
		<main>
			<Form submitHandler={submitHandler}>
				<button type="submit">Register</button>
			</Form>
		</main>
	);
}

export default Register;
