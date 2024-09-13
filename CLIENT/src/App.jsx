import { Routes, Route } from "react-router-dom";

import Header from "./Components/user/Partials/Header";
import Home from "./Components/user/Home";
import Story from "./Components/user/Story";
import Login from "./Components/user/Login";
import Footer from "./Components/user/Partials/Footer";
import Register from "./Components/user/Register";
import CheckAuth from "./Hook/useCheckAuth";
import useAuthCheck from "./Hook/useCheckAuth";
import Dashboard from "./Components/user/Dashboard";
import useRenderCount from './Hook/useRenderCount';
function App() {
    console.log('App rendered'); 
    useRenderCount('App');
    // custom hook pour vérifier si l'utilisateur est connecté
    useAuthCheck();

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="story/:id" element={<Story />} />
				
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />

                <Route path="dashboard" element={<Dashboard />} />

                <Route path="admin" element={<CheckAuth />} />

                <Route path="*" element={<h1>404</h1>} />


			</Routes>
			<Footer />
		</>
	);
}

export default App;
