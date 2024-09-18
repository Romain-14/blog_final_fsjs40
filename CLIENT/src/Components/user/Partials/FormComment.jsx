import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function FormComment({ story_id, parent_id, fetchComments }) {
	console.log(story_id);
	const max = 300;
	const { isLogged } = useSelector((state) => state.user);
	const [comment, setComment] = useState("");
	const [count, setCount] = useState(max);
	const [msg, setMsg] = useState("");

	function onChangeHandler(e) {
		setCount(max - e.target.value.length);
		setComment(e.target.value);
	}

	async function submitHandler(e) {
		e.preventDefault();
		if (comment.length > max) {
			setMsg("Votre commentaire est trop long !");
			return;
		}
		if (comment.length === 0) {
			setMsg("Votre commentaire est vide !");
		} else {
			const data = {
				message: comment,
				parent_id,
			};

			console.log(data);
			const response = await fetch(
				`/api/v1/story/${story_id}/addComment`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify(data),
				}
			);
			console.log(response);
			if (response.status === 201) {
				setComment("");
				setMsg(response.msg);
				fetchComments();
			}
		}
	}

	return (
		<>
			{!isLogged ? (
				<>
					<p>
						Vous devez être connecté pour commenter -&gt;
						<Link to="/login">Se connecter</Link>
					</p>
				</>
			) : (
				<form onSubmit={submitHandler}>
					<textarea
						value={comment}
						onChange={onChangeHandler}
					></textarea>
					<p>{max} caractères maximum !</p>
					{count > 0 && <p>Il vous reste {count} caractères</p>}
					{count < 0 ? (
						<p>Vous avez dépassé de {Math.abs(count)} caractères</p>
					) : null}
					{msg  && <p>{msg}</p>}
					<button type="submit">Envoyer</button>
				</form>
			)}
		</>
	);
}

export default FormComment;
