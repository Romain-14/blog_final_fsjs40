import { useEffect } from "react";
import { toggleMenu } from "../store/Slices/menu";
import { useDispatch, useSelector } from "react-redux";

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
