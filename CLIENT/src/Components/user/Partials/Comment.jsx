import { PropTypes } from "prop-types";

//  on récupère les données transmises par le composant parent déstructurées
function Comment({ comment }) {
	return (
		<article className="comments replies">
			<h3>id user : {comment.user_id}</h3>
			<p>msg : {comment.message}</p>

			{comment.replies.length > 0 && (
				<div className="replies">
					{comment.replies.map((reply) => (
                        // on affiche les réponses à ce commentaire en appelant le composant Comment (récursivité)
						<Comment key={reply.id} comment={reply} />
					))}
				</div>
			)}
		</article>
	);
}

Comment.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default Comment;
