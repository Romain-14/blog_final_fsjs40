import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import useCloseMenu from "../../Hook/useCloseMenu";

const Home = () => {
    useCloseMenu();
	const [stories, setStories] = useState([]);

	useEffect(() => {
		const fetchStories = async () => {
			const response = await fetch(
				"http://localhost:9000/api/v1/story/all"
			);
			const data = await response.json();
			setStories(data);
		};

		fetchStories();
	}, []);

	return (
		<main>
			<section className="articles">
				{stories.length === 0 ? (
					<p>No stories available</p>
				) : (
					stories.map((story, index) => {
						const truncatedContent =
							story.content.length > 100
								? story.content.substring(0, 100) + "..."
								: story.content;
						const sanitizedContent =
							DOMPurify.sanitize(truncatedContent);

						return (
							<article
								key={story.id}
								className={!index ? "top" : ""}
							>
								<Link to={"/story/" + story.id}>
									<p>
										par {story.author}{" "}
										le{" "}
										<time
											dateTime={new Date(
												story.publishDate
											).toLocaleDateString()}
										>
											{new Date(
												story.publishDate
											).toLocaleDateString()}{" "}
											à{" "}
											{new Date(
												story.publishDate
											).toLocaleTimeString()}
										</time>
									</p>
									<div className={index ? "flex-row" : ""}>
										<div className="flex-col">
											<h2>{story.title}</h2>
											<div
												dangerouslySetInnerHTML={{
													__html: sanitizedContent,
												}}
											/>
										</div>
										<img
											src={
												"http://localhost:9000/img/" +
												story.images[0]
											}
											alt={story.title}
										/>
									</div>
								</Link>
								<hr />
							</article>
						);
					})
				)}
			</section>
		</main>
	);
};

export default Home;
