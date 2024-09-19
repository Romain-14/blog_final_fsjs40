import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../Loading";
import { useEffect, useState } from "react";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Story() {
	const [stories, setStories] = useState(null);
    const [selected_story, setSelected_Story] = useState(null);
    const [toggleAddModal, setToggleAddModal] = useState(false);
	const [toggleUpdateModal, setToggleUpdateModal] = useState(false);

	async function fetchStories() {
		const response = await fetch("/api/v1/story/list", {
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		const data = await response.json();
		console.log(data);
		setStories(data);
	}

	useEffect(() => {
		fetchStories();
	}, []);

    if (!stories) return <Loading />;
	return (
		<section>
			<h2>Liste des articles</h2>
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
						<th>Titre</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{stories.map((story) => (
						<tr key={story.id}>
							<td>{story.id}</td>
							<td>{story.title}</td>
							<td className="cta">
								<button
									className="btn-edit"
									onClick={() => {
										setSelected_Story({
											id: story.id,
											label: story.label,
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
										onClickDeleteStory(story.id)
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
					fetchCategories={fetchStories}
				/>
			)}
			{toggleUpdateModal && (
				<UpdateModal
					category={selected_story}
					setToggleUpdateModal={setToggleUpdateModal}
					fetchCategories={fetchStories}
				/>
			)}
		</section>
	);
}

export default Story;
