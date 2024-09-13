import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	password: "",
	avatar: "user.png",
	isLogged: false,
	msg: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state, action) { // lié à la connexion
			state.username = action.payload.username;
			state.password = "";
			state.isLogged = true;
			state.avatar = !action.payload.avatar
				? "user.png"
				: action.payload.avatar;
		},
		logout(state) { // lié à la déconnexion
			state.username = "";
			state.isLogged = false;
			state.avatar = "user.png";
		},
		setMsg(state, action) { // lié à la modification du message d'erreur dans le formulaire de connexion/création
			state.msg = action.payload;
		},
        setAvatar(state, action) { // lié à la modification de l'avatar dans le dashboard
            state.avatar = action.payload;
        },
		updateField(state, action) { // lié au formulaire de connexion/création
			state.username = action.payload.username;
			state.password = action.payload.password;
		},
	},
});

export const { login, logout, updateField, setMsg, setAvatar } = userSlice.actions;
export default userSlice.reducer;
