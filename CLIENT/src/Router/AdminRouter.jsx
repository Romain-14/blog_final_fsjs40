import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/admin/Dashboard";
import User from "../Components/admin/user/List";
import Category from "../Components/admin/category/List";
import Comment from "../Components/admin/comment/List";
import Story from "../Components/admin/story/List";
import Header from "../Components/admin/Partials/Header";
import ProtectedRoute from "../HOC/ProtectedRoute";

function Router() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<ProtectedRoute element={Dashboard} />}>
                    {/* ici chaque route correspondant au click sur un link sera monté dans le Composant Outlet (cf. Composant Dashboard) */}
					<Route path="/user" element={<User />} />
					<Route path="/story" element={<Story />} />
					<Route path="/category" element={<ProtectedRoute element={Category} />} />
					<Route path="/Comment" element={<Comment />} />
				</Route>
				<Route path="*" element={<p>NOT FOUND ADMIN</p>} />
			</Routes>
		</>
	);
}

export default Router;
