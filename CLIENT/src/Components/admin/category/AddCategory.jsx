import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function AddCategory({setToggleAddModal, fetchCategories}) {
	const [label, setLabel] = useState("");

	async function submitCategory(e) {
		e.preventDefault();
		const response = await fetch("/api/v1/category/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			credentials: "include",
			body: JSON.stringify({
				label,
			}),
		});
        if(response.ok) {
            setLabel("");
            setToggleAddModal(false);
            fetchCategories();
        }
	}
	return (
		<aside className="modal-form">
            <button onClick={() => setToggleAddModal(false)}><FontAwesomeIcon icon={faClose} /></button>
			<form onSubmit={submitCategory}>
				<label htmlFor="label">Nom de la catégorie à ajouter :</label>
				<input
					type="text"
					name="label"
					id="label"
					value={label}
					onChange={(e) => setLabel(e.target.value)}
				/>
				<button type="submit">Ajouter</button>
			</form>
		</aside>
	);
}

AddCategory.propTypes = {
    setToggleAddModal: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired
}

export default AddCategory;
