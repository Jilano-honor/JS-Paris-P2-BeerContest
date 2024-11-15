import { useCallback, useEffect, useState } from "react";

import "./PopUp.css";

import barman from "../assets/barman.png";

interface PopUpProps {
	setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
	alcoholLevel: number;
	msg: string;
}

function PopUp({ setPopUp, alcoholLevel, msg }: PopUpProps) {
	const startGame = () => {
		setPopUp(false);
	};

	return (
		<section id="pop-up">
			<img src={barman} alt="Un barman accueillant" />
			{msg === "welcome" ? (
				<div>
					<h2>Bienvenue dans le jeu des bières !</h2>
					<p>
						Découvre ton deck et celui de ton opposant(moi). Si tu veux tu peux
						toujours en charger des nouveaux. <br />
						Le jeu est en 5 manches, tu dois choisir les bières les plus douces
						pour profiter de la soirée en toute sérénité. Chaque défaite
						augmente ton taux d'alcoolémie virtuel. <br />
						Attention à ne pas dépasser tes limites... <br />
						Bon jeu, et santé !
					</p>
					<button type="button" onClick={startGame} onKeyDown={startGame}>
						Commencer la partie
					</button>
				</div>
			) : (
				<></>
			)}
			{msg === "end" && alcoholLevel < 10 ? (
				<div>
					<h2>Bravo, tu as gardé le contrôle !</h2>
					<p>
						Ton taux d'alcoolémie est encore raisonnable, tu pourrais presque
						passer un test de sobriété haut la main ! 🚗👍
					</p>
					<button type="button" onClick={startGame} onKeyDown={startGame}>
						Recommencer une partie
					</button>
				</div>
			) : (
				<></>
			)}
			{msg === "end" && alcoholLevel >= 25 ? (
				<div>
					<h2>Ça commence à monter... 🍻</h2>
					<p>
						Tu sens que la soirée est bien entamée. Peut-être pas au point de
						tout confondre, mais un verre d'eau ne ferait pas de mal.
					</p>
					<button type="button" onClick={startGame} onKeyDown={startGame}>
						Recommencer une partie
					</button>
				</div>
			) : (
				<></>
			)}
			{msg === "end" && alcoholLevel >= 10 && alcoholLevel < 25 ? (
				<div>
					<h2>Oulà, là tu vois double ! 🍺🍺</h2>
					<p>
						Mieux vaut t'asseoir un moment et profiter d'un peu d'eau. La
						prochaine partie attendra un peu que tu reprennes tes esprits !{" "}
					</p>
					<button type="button" onClick={startGame} onKeyDown={startGame}>
						Boire un verre d'eau et recommencer une partie
					</button>
				</div>
			) : (
				<></>
			)}
		</section>
	);
}

export default PopUp;
