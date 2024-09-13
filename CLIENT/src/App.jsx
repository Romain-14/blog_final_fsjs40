import { Routes, Route } from "react-router-dom";

import Header from "./Components/user/Partials/Header";
import Home from "./Components/user/Home";
import Story from "./Components/user/Story";
import Login from "./Components/user/Login";
import Footer from "./Components/user/Partials/Footer";
import Register from "./Components/user/Register";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="story/:id" element={<Story />} />
				
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />

                <Route path="*" element={<h1>404</h1>} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
