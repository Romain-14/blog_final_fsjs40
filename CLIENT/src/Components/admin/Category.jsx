import { useEffect, useState } from "react";
import Loading from "../Loading";

import Modal from "./AddCategory";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Category() {
	const [categories, setCategories] = useState(null);

    const [isModalToggle, setIsModalToggle] = useState(false);

    async function fetchCategories() {
        const response = await fetch("/api/v1/category/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await response.json();
        setCategories(data);
    };

    async function onClickDeleteCategory(id){
        const response = await fetch("/api/v1/category/delete/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if(response.ok){
            fetchCategories();
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

	if (!categories) return <Loading />;
	return (
        <section>
			<h2>Liste des catégories</h2>
            <button className="btn-add" onClick={() => setIsModalToggle(!isModalToggle)}><FontAwesomeIcon icon={faPlus} /> Ajouter une catégorie</button>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Label</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.label}</td>
                            <td className="cta">
                                <button className="btn-edit"><FontAwesomeIcon icon={faEdit} /> Modifier</button>
                                <button className="btn-trash" onClick={()=> onClickDeleteCategory(category.id) }><FontAwesomeIcon icon={faTrash} /> Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalToggle ? <Modal setIsModalToggle={setIsModalToggle} fetchCategories={fetchCategories}/> : null}
		
		</section>
    )
}

export default Category;
