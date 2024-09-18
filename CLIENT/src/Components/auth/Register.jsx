import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailed, setMsg } from "../../store/Slices/user"; // Importer les actions nécessaires
import useCloseMenu from "../../Hook/useCloseMenu";

const Login = () => {
	useCloseMenu();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const msg = useSelector((state) => state.user.msg); // Message d'erreur éventuel

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			// Simuler une requête d'authentification vers le serveur
			const response = await fetch("/api/v1/authentication/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				navigate("/login"); // Rediriger vers la page d'accueil
			} else {
				const errorData = await response.json();
				dispatch(loginFailed({ error: errorData.msg })); // Gestion d'une erreur de login
			}
		} catch (error) {
			console.log(error);
			dispatch(
				setMsg("Erreur lors de l'inscription. Veuillez réessayer.")
			);
		}
	};

	return (
		<>
			<form onSubmit={handleRegister}>
				<label>Nom d&apos;utilisateur</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label>Mot de passe</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{msg && <p>{msg}</p>}
				<button type="submit">S&apos;inscrire</button>
			</form>
		</>
	);
};

export default Login;
