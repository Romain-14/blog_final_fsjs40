import { Link } from "react-router-dom";
import Header from "./Partials/Header";

function Dashboard() {
	return (
		<>
			<Header />

			<main>
				<h1>Dashboard</h1>
				<nav>
					<Link to="/user">Utilisateurs</Link>
					<Link to="/story">Articles
					</Link>
					<Link to="/category">Catégories</Link>
					<Link to="/comment">Commentaires</Link>
				</nav>
			</main>
		</>
	);
}

export default Dashboard;
