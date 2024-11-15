import { useState } from "react";

import "./Game.css";

import AlcoholLevel from "../component/AlcoholLevel";
import GameSet from "../component/GameSet";
import PopUp from "../component/PopUp";

function Game() {
	const [welcomePopUp, setWelcomePopUp] = useState<boolean>(true);
	const [endPopUp, setEndPopUp] = useState<boolean>(false);
	const [alcoholLevel, setAlcoholLevel] = useState(0);

	return (
		<main id="game-main">
			{welcomePopUp ? (
				<PopUp
					setPopUp={setWelcomePopUp}
					alcoholLevel={alcoholLevel}
					msg="welcome"
				/>
			) : (
				<></>
			)}
			{endPopUp ? (
				<PopUp setPopUp={setEndPopUp} alcoholLevel={alcoholLevel} msg="end" />
			) : (
				<></>
			)}
			<section>
				<div id="game-alcohol-level">
					<AlcoholLevel />
				</div>
			</section>
			<section id="game-gameset">
				<GameSet setPopUp={setEndPopUp} setAlcoholLevel={setAlcoholLevel} />
			</section>
			<section>
				<article id="game-rules">
					<h3>Comment jouer ?</h3>
					<p>
						Bienvenue dans le jeu des bières ! <br />
						Jouez 5 manches contre le barman. Le plus bas taux gagne. Chaque
						défaite augmente votre taux d'alcoolémie virtuel.
						<br />
						Bon jeu, et santé !
					</p>
				</article>
			</section>
		</main>
	);
}

export default Game;
