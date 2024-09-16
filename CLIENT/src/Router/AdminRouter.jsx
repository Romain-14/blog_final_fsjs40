import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/admin/Dashboard";
import User from "../Components/admin/User";
import Category from "../Components/admin/Category";
import Comment from "../Components/admin/Comment";
import Story from "../Components/admin/Story";
import Header from "../Components/admin/Partials/Header";

function Router() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Dashboard />}>
                    {/* ici chaque route correspondant au click sur un link sera monté dans le Composant Outlet (cf. Composant Dashboard) */}
					<Route path="/user" element={<User />} />
					<Route path="/story" element={<Story />} />
					<Route path="/category" element={<Category />} />
					<Route path="/Comment" element={<Comment />} />
				</Route>
				<Route path="*" element={<p>NOT FOUND ADMIN</p>} />
			</Routes>
		</>
	);
}

export default Router;
