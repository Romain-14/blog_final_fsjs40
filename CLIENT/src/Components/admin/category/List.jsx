import { useEffect, useState } from "react";
import Loading from "../../Loading";

import AddModal from "./AddCategory";
import UpdateModal from "./UpdateCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { fetchCategories } from "../../../services/api.js";

function Category() {
	const [selected_category, setSelected_Category] = useState(null);
	const [categories, setCategories] = useState(null);

	const [toggleAddModal, setToggleAddModal] = useState(false);
	const [toggleUpdateModal, setToggleUpdateModal] = useState(false);



	async function onClickDeleteCategory(id) {
		const response = await fetch("/api/v1/category/delete/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		if (response.ok) {
			fetchCategories();
		}
	}

	useEffect(() => {
		fetchCategories().then(data => setCategories(data)); 
	}, []);

	if (!categories) return <Loading />;
	return (
		<section>
			<h2>Liste des catégories</h2>
			<button
				className="btn-add"
				onClick={() => setToggleAddModal(!toggleAddModal)}
			>
				<FontAwesomeIcon icon={faPlus} /> Ajouter
			</button>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Label</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
                    {console.log(categories)}
					{categories.map((category) => (
						<tr key={category.id}>
							<td>{category.id}</td>
							<td>{category.label}</td>
							<td className="cta">
								<button
									className="btn-edit"
									onClick={() => {
										setSelected_Category({
											id: category.id,
											label: category.label,
										});

										setToggleUpdateModal(
											!toggleUpdateModal
										);
									}}
								>
									<FontAwesomeIcon icon={faEdit} /> Modifier
								</button>
								<button
									className="btn-delete"
									onClick={() =>
										onClickDeleteCategory(category.id)
									}
								>
									<FontAwesomeIcon icon={faTrash} /> Supprimer
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{toggleAddModal && (
				<AddModal
					setToggleAddModal={setToggleAddModal}
					fetchCategories={fetchCategories}
				/>
			)}
			{toggleUpdateModal && (
				<UpdateModal
					category={selected_category}
					setToggleUpdateModal={setToggleUpdateModal}
					fetchCategories={fetchCategories}
				/>
			)}
		</section>
	);
}

export default Category;
