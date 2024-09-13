import PropTypes from "prop-types";
import BackHome from "./BackHome";

import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../store/Slices/user";

function Form(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	return (
		<>
			<BackHome />

			<form onSubmit={props.submitHandler}>

				{user.msg && <p className="error user-msg">{user.msg}</p>}

				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					value={user.username}
					onChange={(e) =>
						dispatch(
							updateField({
								...user,
								[e.target.name]: e.target.value,
							})
						)
					}
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={user.password}
					onChange={(e) =>
						dispatch(
							updateField({
								...user,
								[e.target.name]: e.target.value,
							})
						)
					}
					required
				/>

				{props.children}
			</form>
		</>
	);
}

Form.propTypes = {
	submitHandler: PropTypes.func.isRequired,
	children: PropTypes.node,
	msg: PropTypes.string,
};

export default Form;
