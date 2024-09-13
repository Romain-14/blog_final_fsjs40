import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function BackHome() {
	return (
		<Link to={"/"}>
			<FontAwesomeIcon icon={faArrowLeft} /> Back to home
		</Link>
	);
}

export default BackHome;
