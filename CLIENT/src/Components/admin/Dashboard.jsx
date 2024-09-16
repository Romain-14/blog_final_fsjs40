import { Outlet } from "react-router-dom";

function Dashboard() {
	return (
		<>
			<main id="admin">
				<hr />

				<section>
					<h2>Statistiques</h2>
					<ul>
						<li>Nombre d&apos;utilisateurs : </li>
						<li>Nombre d&apos;articles : </li>
						<li>Nombre de catégories : </li>
						<li>Nombre de commentaires : </li>
					</ul>
				</section>

				<Outlet />
			</main>
		</>
	);
}

export default Dashboard;
