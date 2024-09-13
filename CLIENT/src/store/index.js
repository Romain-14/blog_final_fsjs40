import { configureStore } from "@reduxjs/toolkit";

import menuReducer from "./Slices/menu";
import userReducer from "./Slices/user";

const store = configureStore({
	reducer: {
		menu: menuReducer,
		user: userReducer,
	},
});

export default store;
