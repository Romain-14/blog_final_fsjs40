import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleMenu } from "../../store/Slices/menu";
import { login, updateField, setMsg } from "../../store/Slices/user";
import Form from "./Partials/Form";

function Login() {
    // on récupère les données du store
    // le state du menu
	const menu = useSelector((state) => state.menu);
    // le state de l'utilisateur
	const user = useSelector((state) => state.user);
    // on récupère la fonction dispatch pour envoyer des actions
	const dispatch = useDispatch(); 
    // on récupère la fonction navigate pour la redirection
	const navigate = useNavigate(); 

    // au 1er montage du composant on ferme le menu si il est ouvert
	useEffect(() => {
        // pour ça on utiliser l'action toggleMenu du slice menu
		if (menu.isOpen) dispatch(toggleMenu());

        // on remet le mot de passe à vide pour éviter qu'il soit prérempli si on revient sur la page
        return () => {
            dispatch(updateField({username: user.username, password: ""}));
        }
	}, []);

	async function submitHandler(e) {
		e.preventDefault();
        // on vérifie que les champs sont remplis 
		if (!user.username || !user.password) {
			setMsg("Remplissez tous les champs");
			return; // on sort de la fonction si les champs ne sont pas remplis
		}
        
        // sinon on envoie les données au serveur au format JSON sur une route post
		const response = await fetch("/api/v1/authentication/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
            // si la réponse n'est pas ok on converti la réponse en JSON
		});

        // on converti la réponse en JSON pour dans tous les cas récupérer le message d'erreur envoyé par le back
        const data = await response.json();
        // si la réponse est ok
		if (response.status === 200) {
            // on envoie l'action login avec les données de l'utilisateur envoyé par la route de login du back
			dispatch(
				login({
					username: data.userInfos.username,
					avatar: data.userInfos.avatar,
				})
			);
            // on redirige l'utilisateur sur la page d'accueil
			navigate("/");
		} else {
			dispatch(setMsg(data.msg));
		}
	}

	return (
		<main>
			<Form submitHandler={submitHandler}>
				<button type="submit">Login</button>
				<hr />
				<p>
					No account yet ? create one -&gt;{" "}
					<Link to="/register">by clicking here</Link>
				</p>
			</Form>
		</main>
	);
}

export default Login;
