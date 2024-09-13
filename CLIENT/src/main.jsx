import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.scss";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/index";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
