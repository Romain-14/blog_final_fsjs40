import { useSelector } from "react-redux";
import useCloseMenu from "../../Hook/useCloseMenu";
import AvatarList from "./Partials/AvatarList";

function Dashboard() {    
	useCloseMenu();

	const user = useSelector((state) => state.user);

	return (
		<main id="dashboard">
			<h2>Hello {user.username}</h2>

			<section>
				<h3>Your profile</h3>
				<img src={`/icons/${user.avatar}`} alt={user.username} />
				<p>Alias : {user.username}</p>

				<AvatarList />
			</section>
		</main>
	);
}

export default Dashboard;
