import { useState } from "react";

import "./Game.css";

import GameSet from "../component/GameSet";
import PopUp from "../component/PopUp";
import { useUserStats } from "../context/UserStats";

function Game() {
	const GAME_STATES = { start: 0, ingame: 1, end: 2 };
	const [currentGameState, setCurrentGameState] = useState<number>(
		GAME_STATES.start,
	);
	const [alcoholLevel, setAlcoholLevel] = useState<number>(0);
	const [statsDisplayed, setStatsDisplayed] = useState<boolean>(false);

	const showStats = () => {
		setStatsDisplayed(!statsDisplayed);
	};

	const { userStats } = useUserStats();

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
				<div id="game-stats">
					<button
						type="button"
						className="game-buttons"
						id="button-stats"
						onClick={showStats}
					>
						{statsDisplayed
							? "Masquer mes statistiques"
							: "Afficher mes statistiques"}
					</button>
					{statsDisplayed ? (
						<article>
							<p>Nombre de parties terminées</p>
							<p>{userStats.gamePlayed}</p>
							<p>Niveau d'alcoolémie moyen par partie</p>
							<p>{userStats.gamePlayed}</p>
							<p id="header-nb-games">Nombre de partie avec... </p>
							<p className="stats-taux">...un taux d'alcoolémie faible</p>
							<p>{userStats.gameLowAlcohol}</p>
							<p className="stats-taux">...un taux d'alcoolémie modéré</p>
							<p>{userStats.gameMiddleAlcohol}</p>
							<p className="stats-taux">...un taux d'alcoolémie élevé</p>
							<p>{userStats.gameHighAlcohol}</p>
						</article>
					) : (
						<></>
					)}
				</div>
			</section>
			<section id="game-gameset">
				<GameSet
					currentGameState={currentGameState}
					gameStates={GAME_STATES}
					setCurrentGameState={setCurrentGameState}
					setAlcoholLevel={setAlcoholLevel}
					alcoholLevel={alcoholLevel}
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
