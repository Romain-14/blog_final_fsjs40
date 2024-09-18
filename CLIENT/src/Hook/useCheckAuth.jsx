import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/Slices/user";
import { useNavigate } from "react-router-dom";

function useCheckAuth() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchAuthentication() {
            // simule une latence de 1 seconde pour voir le chargement en localhost
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
			try {
				const response = await fetch(
					"/api/v1/authentication/check-auth",
					{
                        // dans la requête on envoie les cookies pour que le serveur puisse s'en servir afin de vérifier l'état de connexion
						credentials: "include",
					}
				);
                // on envoi un 401 depuis le serveur en JSON si c'est le cas "utilisateur non connecté on stoppe la fonction avec un return"
				if (response.status === 401) {
					console.log("utilisateur non connecté sur le serveur");
                    navigate("/");
					return;
				}
                // si la réponse est ok, on récupère les données de l'utilisateur envoyé en JSON qu'on parse et on les stocke dans le state setUser, qui est un state d'un context User
				if (response.ok) {
					const data = await response.json();
					dispatch(login(data));
				} else {
					console.log(`Server error: ${response.status}`);
				}
			} catch (error) {
				console.log(`Fetch error: ${error.message}`);
			} finally {
                // le finally est utilisé afin d'executer une/plusieurs instructions dans tous les cas de figure (succès, erreur, etc...)
                // ici on arrête "le chargement" et on oriente vers le bon router
				setIsLoading(false);
			}
		}
        // simuler une latence de 2 secondes pour voir le chargement en localhost
        // setTimeout(() => {
            fetchAuthentication();
        // }, 2000);
	}, []);


    return [user, isLoading ];
}

export default useCheckAuth;