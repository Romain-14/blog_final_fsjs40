import { useEffect } from "react";
import { toggleMenu } from "../store/Slices/menu";
import { useDispatch, useSelector } from "react-redux";

// custom hook pour fermer le menu si il est ouvert
// utile lors de changement de page
function useCloseMenu() {
	const menu = useSelector((state) => state.menu);
	const dispatch = useDispatch();

	useEffect(() => {
		if (menu.isOpen) {
			dispatch(toggleMenu());
		}
	}, []);
}

export default useCloseMenu;
