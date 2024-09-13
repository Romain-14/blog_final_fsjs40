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
		login(state, action) {
			state.username = action.payload.username;
			state.password = "";
			state.isLogged = true;
			state.avatar = !action.payload.avatar
				? "user.png"
				: action.payload.avatar;
		},
		logout(state) {
			state.username = "";
			state.isLogged = false;
			state.avatar = "user.png";
		},
		setMsg(state, action) {
            console.log(action.payload)
			state.msg = action.payload;
		},
		updateField(state, action) {
			state.username = action.payload.username;
			state.password = action.payload.password;
		},
	},
});

export const { login, logout, updateField, setMsg } = userSlice.actions;
export default userSlice.reducer;
