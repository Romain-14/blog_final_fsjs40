import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../../store/Slices/user";

function AvatarList() {
    // state pour stocker la liste des avatars de la base de données
	const [list, setList] = useState(null);
    // state pour stocker le nouvel avatar sélectionné
	const [newAvatar, setNewAvatar] = useState(null);

	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();


	useEffect(() => {
		async function fetchAvatar() {
			const response = await fetch("/api/v1/avatar/all", {
				method: "GET",
				credentials: "include",
			});
            // mise à jour du state list avec la liste des avatars           
			const datas = await response.json();
			setList(datas);
		}

		fetchAvatar();
	}, []);

	async function submitChangeAvatar(e) {
		e.preventDefault();
        // si aucun nouvel avatar n'est sélectionné, on ne fait rien (pas de fetch)
		if (!newAvatar) return;
        console.log("newAvatar", newAvatar)
		const response = await fetch(`/api/v1/user/avatar/${newAvatar}`, {
			method: "PATCH",
			credentials: "include",
		});
        // voir également la route du fetch -> updateAvatar du fichier controller/user.js
		const data = await response.json();
        console.log(data)
        // mise à jour du state avatar avec le nouvel avatar
		dispatch(setAvatar(data.avatar));
	}

	return (
		<aside>
			<form>
				{list &&
					list.map((avatar) => {
						if (avatar.label !== user.avatar) {
							return (
								<div key={avatar.id}>
									<label htmlFor={avatar.label}>
										<img
											src={`/icons/${avatar.label}`}
											alt={avatar.label}
										/>
									</label>
									<input
										type="radio"
										name="avatar"
										id={avatar.label}
										value={avatar.id}
										onChange={(e) =>
											setNewAvatar(e.target.value)
										}
									/>
								</div>
							);
						}
					})}
				<button
					onClick={submitChangeAvatar}
					className={!newAvatar ? "disabled" : ""}
					disabled={!newAvatar}
				>
					Changer l&apos;avatar
				</button>
			</form>
		</aside>
	);
}

export default AvatarList;
