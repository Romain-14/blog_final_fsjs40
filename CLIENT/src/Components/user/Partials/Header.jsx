import { Link } from "react-router-dom";
import Nav from "./Nav";

function Header() {
	return (
		<header>
			<Link to={"/"}>
				<h1>MyBlog</h1>
			</Link>
            
			<Nav />
		</header>
	);
}

export default Header;
