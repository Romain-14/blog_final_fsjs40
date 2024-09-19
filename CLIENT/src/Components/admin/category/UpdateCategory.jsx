import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PropTypes from "prop-types";

function UpdateCategory({ category, fetchCategories, setToggleUpdateModal }) {
	const [label, setLabel] = useState(category.label);

	async function submitHandler(e) {
		e.preventDefault();
		const response = await fetch("/api/v1/category/update/" + category.id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				label,
			}),
		});
		if (response.ok) {
			setLabel("");
			setToggleUpdateModal(false);
			fetchCategories();
		}
	}
	return (
		<aside className="modal-form">
			<button onClick={() => setToggleUpdateModal(false)}>
				<FontAwesomeIcon icon={faClose} />
			</button>
			<form onSubmit={submitHandler}>
				<label htmlFor="label">Modifier le nom de la catégorie :</label>
				<input
					type="text"
					name="label"
					id="label"
					value={label}
					onChange={(e) => setLabel(e.target.value)}
				/>
				<button type="submit">Modifier</button>
			</form>
		</aside>
	);
}

UpdateCategory.propTypes = {
	category: PropTypes.object.isRequired,
	fetchCategories: PropTypes.func.isRequired,
	setToggleUpdateModal: PropTypes.func.isRequired,
};

export default UpdateCategory;
