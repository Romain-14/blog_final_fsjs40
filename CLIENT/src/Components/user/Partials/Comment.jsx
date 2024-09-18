import { PropTypes } from "prop-types";
import { useState } from "react";
import FormComment from "./FormComment";

//  on récupère les données transmises par le composant parent déstructurées
function Comment({ comment, story_id, fetchComments }) {
    const [isToggleForm, setToggleForm] = useState(false);
	return (
		<article className="comments replies">
			<h3>
				<img
					src={`/icons/${
						comment.avatar ? comment.avatar : "user.png"
					}`}
				/>{" "}
				{comment.username} | à{" "}
				{new Date(comment.publishDate).toLocaleTimeString()} le{" "}
				{new Date(comment.publishDate).toLocaleDateString()}
			</h3>
			<p>{comment.message}</p>
            
            <button onClick={()=>setToggleForm(!isToggleForm)}>{!isToggleForm ? "Répondre" : "Ne pas répondre"}</button>
            {
                isToggleForm && <FormComment story_id={story_id} parent_id={comment.id} fetchComments={fetchComments} />
            }

			{comment.replies.length > 0 && (
				<div className="replies">
					{comment.replies.map((reply) => (
						<Comment key={reply.id} comment={reply} story_id={story_id}  parent_id={comment.id} fetchComments={fetchComments}/>
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
