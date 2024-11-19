import { useState } from "react";

import "./Game.css";

import AlcoholLevel from "../component/AlcoholLevel";
import GameSet from "../component/GameSet";
import PopUp from "../component/PopUp";

function Game() {
	const GAME_STATES = { start: 0, ingame: 1, end: 2 };

	const [currentGameState, setCurrentGameState] = useState<number>(
		GAME_STATES.start,
	);
	const [alcoholLevel, setAlcoholLevel] = useState<number>(0);

	return (
		<main id="game-main">
			{currentGameState !== GAME_STATES.ingame ? (
				<PopUp
					currentGameState={currentGameState}
					gameStates={GAME_STATES}
					setCurrentGameState={setCurrentGameState}
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
					currentGameState={currentGameState}
					gameStates={GAME_STATES}
					setCurrentGameState={setCurrentGameState}
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
