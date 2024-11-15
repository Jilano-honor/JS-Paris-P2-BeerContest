import { useState } from "react";

import "./PopUp.css";

import barman from "../assets/barman.png";

interface PopUpProps {
	setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function PopUp({ setPopUp }: PopUpProps) {
	const [msg, setMsg] = useState<string>("welcome");

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
						Le jeu est en 5 manches, chaque défaite augmente ton taux
						d'alcoolémie virtuel. <br />
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
		</section>
	);
}

export default PopUp;
