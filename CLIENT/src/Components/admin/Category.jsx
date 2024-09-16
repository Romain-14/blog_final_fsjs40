import { useEffect, useState } from "react";
import Loading from "../Loading";

import Modal from "./AddCategory";

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
            <button onClick={() => setIsModalToggle(!isModalToggle)}>Ajouter une catégorie</button>
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
                            <td>
                                <button>Modifier</button>
                                <button onClick={()=> onClickDeleteCategory(category.id) }>Supprimer</button>
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
