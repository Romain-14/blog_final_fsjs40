import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// DOMPurify est un package qui permet de nettoyer le code HTML pour éviter les attaques XSS
// react prévient déjà des attaques XSS mais DOMPurify est plus complet et nécessaire car on récupère des données HTML du serveur et on utilise pour les afficher dangerouslySetInnerHTML
import DOMPurify from "dompurify";
import Comment from "./Partials/Comment";

function Story() {
	const { id } = useParams();
    
	const [story, setStory]       = useState();
	const [comments, setComments] = useState(null);

	useEffect(() => {
		const fetchStory = async () => {
			const response = await fetch(`/api/v1/story/${id}`);
			const data     = await response.json();
			setStory(data);
		};

		fetchStory();
	}, [id]);

	useEffect(() => {
		const fetchComments = async () => {
			const response = await fetch(
				`/api/v1/comment/all-from-story/${id}`
			);
			const datas = await response.json();

            // pour créer un fil de discussion dynamique
            // on crée un objet commentMap qui va contenir tous les commentaires
            // et un tableau commentList qui va contenir les commentaires de premier niveau
			const commentMap = {};
			const commentList = [];

            // on parcourt les commentaires reçus du serveur
			datas.forEach((comment) => {
                // on ajoute un tableau replies à chaque commentaire ('réponses')
				comment.replies = [];
                // on ajoute le commentaire en cours d'itération à commentMap
				commentMap[comment.id] = comment;

                // si le commentaire n'a pas de parent
				if (comment.parent_id === null) {
                    // on l'ajoute comme un commentaire de 1er niveau (commentList)
					commentList.push(comment);
				} else {
                    // sinon, on ajoute le commentaire comme réponse à son parent                    
					const parentComment = commentMap[comment.parent_id];
                    // si le parent existe (ce qui devrait toujours être le cas)
					if (parentComment) {
                        // on ajoute le commentaire comme réponse à son parent
						parentComment.replies.push(comment);
					}
				}
			});
            // on met à jour les commentaires
			setComments(commentList);
		};

		fetchComments();
	}, [id]);

	function submitHandler(e) {
		e.preventDefault();
	}

	return (
		<main>
			{!story ? (
				<p>Chargement...</p>
			) : (
				<>
					<article>
						<h1>{story.title}</h1>
						<img
							src={`http://localhost:9000/img/${story.images[0]}`}
							alt={story.title}
						/>
						<div
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(story.content),
							}}
						/>
					</article>

					<hr />

					<aside>
						<h2>Commentaires</h2>
						<form onSubmit={submitHandler}>
							<textarea></textarea>
							<button>Envoyer</button>
						</form>
						{!comments ? (
							<p>Chargement...</p>
						) : (
                            // on affiche les commentaires de 1er niveau
							comments.map((comment) => (
                                // le reste se fait dans le composant Comment ->
								<Comment key={comment.id} comment={comment} />
							))
						)}
					</aside>
				</>
			)}
		</main>
	);
}

export default Story;
