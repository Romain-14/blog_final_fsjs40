import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/admin/Dashboard";

function Router() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />} />

				<Route path="*" element={<p>NOT FOUND</p>} />
			</Routes>
		</>
	);
}

export default Router;
