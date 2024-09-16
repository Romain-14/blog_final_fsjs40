import { useState } from "react";
import PropTypes from "prop-types";

function AddCategory({setIsModalToggle, fetchCategories}) {
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
            setIsModalToggle(false);
            fetchCategories();
        }
	}
	return (
		<aside className="modal-form">
			<form onSubmit={submitCategory}>
				<label htmlFor="label">Nom de la catégorie :</label>
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
    setIsModalToggle: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired
}

export default AddCategory;
