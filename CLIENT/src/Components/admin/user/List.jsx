import { useEffect, useState } from "react";
import Loading from "../../Loading";

function User() {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch("/api/v1/user/list", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			const data = await response.json();
			setUsers(data);
		};
		fetchUsers();
	}, []);

	if (!users) return <Loading />;

	return (
		<section>
			<h2>Liste des utilisateurs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <img
                                    src={`/icons/${user.avatar ? user.avatar : "user.png"}`}
                                    alt={user.username}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
		
		</section>
	);
}

export default User;
