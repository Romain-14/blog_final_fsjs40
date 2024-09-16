import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, loginFailed, setMsg } from "../../store/Slices/user"; // Importer les actions nécessaires
import useCloseMenu from "../../Hook/useCloseMenu";

const Login = () => {
	useCloseMenu();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { authError } = useSelector((state) => state.user); // Message d'erreur éventuel

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Simuler une requête d'authentification vers le serveur
			const response = await fetch("/api/v1/authentication/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				const data = await response.json();
				dispatch(login(data)); // Dispatch la connexion avec les infos de l'utilisateur
				navigate("/"); // Rediriger vers la page d'accueil
			} else {
				const errorData = await response.json();
				console.log(errorData);
				dispatch(loginFailed({ error: errorData.msg })); // Gestion d'une erreur de login
			}
		} catch (error) {
			console.log(error);
			dispatch(
				setMsg("Erreur lors de la connexion. Veuillez réessayer.")
			); // Gestion d'une erreur de connexion
		}
	};

	return (
		<>
			<form onSubmit={handleLogin}>
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
				{authError && <p>{authError}</p>}
				<button type="submit">Se connecter</button>
			</form>
			<p>
				Pas de compte ?{" "}
				<button onClick={() => navigate("/register")}>
					S&apos;inscrire
				</button>
			</p>
		</>
	);
};

export default Login;
