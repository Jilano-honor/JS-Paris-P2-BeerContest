import { useState } from "react";

import "./Game.css";

import AlcoholLevel from "../component/AlcoholLevel";
import GameSet from "../component/GameSet";
import PopUp from "../component/PopUp";

function Game() {
	const [popUp, setPopUp] = useState<boolean>(true);

	return (
		<main id="game-main">
			{popUp ? <PopUp setPopUp={setPopUp} /> : <></>}
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
						Jouez 5 manches contre le barman. Chaque défaite augmente votre taux
						d'alcoolémie virtuel.
						<br />
						Bon jeu, et santé !
					</p>
				</article>
			</section>
		</main>
	);
}

export default Game;
