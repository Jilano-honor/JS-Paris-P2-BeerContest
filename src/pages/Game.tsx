import "./Game.css";

import AlcoholLevel from "../component/AlcoholLevel";
import GameSet from "../component/GameSet";

function Game() {
	return (
		<main id="game-main">
			<section>
				<div id="game-alcohol-level">
					<AlcoholLevel />
				</div>
			</section>
			<section id="game-gameset">
				<GameSet />
			</section>
			<section>
				<article id="game-rules">
					<h3>Comment jouer ?</h3>
					<p>
						Bienvenue dans le jeu des bières ! <br />
						Jouez 5 manches contre l’ordinateur. Chaque défaite augmente votre
						taux d'alcoolémie virtuel.
						<br />
						Bon jeu, et santé !
					</p>
				</article>
			</section>
		</main>
	);
}

export default Game;
