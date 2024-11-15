import { Link } from "react-router-dom";

import "./GameButton.css";

const GameButton = () => {
	return (
		<Link to="/game">
			<button type="button" id="home-button">
				<p>Jouer</p>
				<img src="src/assets/picto-beer.png" alt="logo bière" />
			</button>
		</Link>
	);
};

export default GameButton;
