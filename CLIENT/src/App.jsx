import { useEffect, useState } from "react";

function App() {
	const [stories, setStories] = useState(null);
	useEffect(() => {
		async function fetchStories() {
            // cibler l'url de votre serveur (attention au PORT !) suivi des paramètres de la route à cibler sur celui-ci
            // le reste est classique, les données sont envoyé en JSON on doit donc parser la réponse pour pouvoir la manipuler
			const datas = await fetch("http://localhost:9000/api/v1/story/all");
			const datasJSON = await datas.json();
			console.log(datasJSON);
            setStories(datasJSON)
		}

		fetchStories();
	}, []);
	return (
		<main>
			<h1>My blog</h1>
			{!stories ? (
				<p>loading</p>
			) : (
				stories.map((story) => <h2 key={story.id}>{story.title} à l&apos;id N°{story.id}</h2>)
			)}
		</main>
	);
}

export default App;
