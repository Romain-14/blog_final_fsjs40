
import { Link } from "react-router-dom";

function Header() {
	return (
		<nav>
			<Link to="/">Dashboard</Link>
			<Link to="/users">Users</Link>
			<Link to="/categories">Categories</Link>
			<Link to="/stories">Stories</Link>
			<Link to="/comments">Comments</Link>
		</nav>
	);
}

export default Header;
