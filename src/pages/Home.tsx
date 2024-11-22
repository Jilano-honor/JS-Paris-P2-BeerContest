import HomeButtons from "../component/HomeButtons";
import "./Home.css";

function Home() {
	return (
		<main id="main-home">
			<header id="header-home">
				<div className="entrance-game">
					<h1>Bienvenue sur notre Beer Contest</h1>
					<img
						src="src\assets\barman.png"
						alt="Le barman"
						className="character-image-mobile"
					/>
					<p className="header-txt">
						L’abus d’alcool est dangereux pour la santé, buvez avec modération.
					</p>
					<p className="header-txt">
						Mais ici, pas de risques — on ne boit que numériquement ! Alors
						attrape un verre d’eau, installe-toi confortablement, et affronte
						l’ordinateur sans modération !
					</p>

					<HomeButtons />
				</div>
			</header>
			<img
				src="src\assets\barman.png"
				alt="Le barman"
				className="character-image"
			/>
		</main>
	);
}
export default Home;
