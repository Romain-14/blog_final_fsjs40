import { Routes, Route } from "react-router-dom";

import Header from "../Components/user/Partials/Header";
import Home from "../Components/user/Home";
import Story from "../Components/user/Story";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Dashboard from "../Components/user/Dashboard";
import ProtectedRoute from "../HOC/ProtectedRoute";
import Footer from "../Components/user/Partials/Footer";

function UserRouter() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="story/:id" element={<Story />} />

				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />

				
				<Route
					path="dashboard"
					element={<ProtectedRoute element={Dashboard} />}
				/>

				<Route path="*" element={<h1>404 NOT FOUND USER</h1>} />
			</Routes>
			<Footer />
		</>
	);
}

export default UserRouter;
