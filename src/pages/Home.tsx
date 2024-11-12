import "./Home.css";

function Home() {
	return (
		<main id="main-home">
			<img
				src="src\assets\barman.png"
				alt="Mon personnage"
				className={"character-image"}
			/>

			<header id="header-home">
				<div className="entrance-game">
					<h1>Bienvenue sur notre Beer Contest</h1>
					<p>
						L’abus d’alcool est dangereux pour la santé, buvez avec modération.
					</p>
					<p>
						Mais ici, pas de risques — on ne boit que numériquement ! Alors
						attrapez un verre d’eau, installez-vous confortablement, et
						affrontez l’ordinateur sans modération !
					</p>
					<button type="button" id="home-button">
						Jouer{" "}
						<img
							src="src\assets\oktoberfest-beer-glasses-in-barrel-design-free-vector.jpg"
							alt="logo bière"
						/>
					</button>
				</div>
			</header>
		</main>
	);
}

export default Home;
