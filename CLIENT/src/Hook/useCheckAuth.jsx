import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/Slices/user";
import { useNavigate } from "react-router-dom";

// permets de maintenir la connexion de l'utilisateur si il rafraîchit la page, car le state est remis à zéro donc l'utilisateur est déconnecté à chaque rafraîchissement, ce hook permet de vérifier si l'utilisateur est connecté et de le reconnecter si c'est le cas
const useAuthCheck = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLogged = useSelector((state) => state.user.isLogged);

	useEffect(() => {
		console.log("useAuthCheck");
		async function checkAuth() {
			const response = await fetch("/api/v1/authentication/check-auth", {
				method: "POST",
				credentials: "include", // envoi des cookies pour vérifier si l'utilisateur est connecté
			});
			const { auth, user } = await response.json();
			console.log(auth, user);
            
			if (auth && !isLogged) { // si l'utilisateur est connecté sur le serveur mais sur le client (state redux), on le connecte sur le client
                console.log("first")
				dispatch( 
					login({ username: user.username, avatar: user.avatar })
				);
			} else if (!auth && !isLogged) {
                // si l'utilisateur n'est pas connecté sur le serveur, on le déconnecte sur le client
                // on le redirige vers la page d'accueil
				dispatch(logout());
				navigate("/");
			}
		}

		checkAuth();
	}, []);
};

export default useAuthCheck;
