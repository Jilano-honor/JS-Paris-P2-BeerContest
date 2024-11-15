import React from "react";
import { Link } from "react-router-dom";

const GameButton = () => {
	return (
		<Link to="/game">
			<button type="button" id="home-button">
				Jouer
				<img
					src="src/assets/oktoberfest-beer-glasses-in-barrel-design-free-vector.jpg"
					alt="logo bière"
				/>
			</button>
		</Link>
	);
};

export default GameButton;
