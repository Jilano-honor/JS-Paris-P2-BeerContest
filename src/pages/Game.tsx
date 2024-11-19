import { useState } from "react";

import "./Game.css";

import AlcoholLevel from "../component/AlcoholLevel";
import GameSet from "../component/GameSet";
import PopUp from "../component/PopUp";

function Game() {
	const states = { start: 0, ingame: 1, end: 2 };

	const [gameState, setGameState] = useState<number>(states.start);
	const [alcoholLevel, setAlcoholLevel] = useState<number>(0);

	return (
		<main id="game-main">
			{gameState !== states.ingame ? (
				<PopUp
					gameState={gameState}
					states={states}
					setGameState={setGameState}
					alcoholLevel={alcoholLevel}
				/>
			) : (
				<></>
			)}
			<section>
				<div id="game-alcohol-level">
					<AlcoholLevel />
				</div>
			</section>
			<section id="game-gameset">
				<GameSet
					states={states}
					setGameState={setGameState}
					setAlcoholLevel={setAlcoholLevel}
				/>
			</section>
			<section>
				<article id="game-rules">
					<h3>Comment jouer ?</h3>
					<p>
						Bienvenue dans le jeu des bières ! <br />
						Joue 5 manches contre le barman. Le plus bas taux gagne. Chaque
						défaite augmente ton taux d'alcoolémie virtuel.
						<br />
						Bon jeu, et santé !
					</p>
				</article>
			</section>
		</main>
	);
}

export default Game;
