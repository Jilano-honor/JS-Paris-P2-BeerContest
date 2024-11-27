import "./Beercard.css";
import { useState } from "react";
import type React from "react";

interface BeerCardProps {
	beer: {
		sku: string;
		name: string;
		sub_category_1: string;
		sub_category_2?: string;
		sub_category_3?: string;
		country: string;
		abv: string;
		tasting_notes: string;
		food_pairing: string;
	};
	handleUserCardSelect?: (beer: {
		sku: string;
		name: string;
		sub_category_1: string;
		sub_category_2?: string;
		sub_category_3?: string;
		country: string;
		abv: string;
		tasting_notes: string;
		food_pairing: string;
	}) => void;
}

const BeerCard = ({ beer, handleUserCardSelect }: BeerCardProps) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const abvNumber = Number.parseFloat(beer.abv.replace("%", ""));
	let getColorByAlcoholLevelClass = "";
	if (abvNumber < 4.99) {
		getColorByAlcoholLevelClass = "second-color";
	}
	if (abvNumber >= 5 && abvNumber < 8) {
		getColorByAlcoholLevelClass = "light-color";
	}
	if (abvNumber >= 7.99) {
		getColorByAlcoholLevelClass = "dark-color";
	}

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	const handleClick = () => {
		handleFlip();
		if (handleUserCardSelect) {
			handleUserCardSelect(beer);
		}
	};

	const handleKeyUp = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			handleFlip();
			if (handleUserCardSelect) {
				handleUserCardSelect(beer);
			}
		}
	};

	return (
		<div
			className={`beer-card ${isFlipped ? "flipped" : ""}`}
			onClick={handleClick}
			onKeyUp={handleKeyUp}
		>
			<div className="beer-card-font">
				<div className="container-name">
					<h2>{beer.name}</h2>
				</div>

				<div className={`container-number ${getColorByAlcoholLevelClass}`}>
					<h3>{beer.abv.slice(0, -2)}%</h3>
				</div>

				<button
					className="container-I-card"
					onClick={handleClick}
					onKeyUp={handleKeyUp}
					tabIndex={0}
					type="button"
				>
					<h3>I</h3>
				</button>
			</div>

			<div className="beer-card-back">
				<p>
					<strong>Food Pairing:</strong> {beer.food_pairing}
				</p>

				<button
					className="container-I-card-back"
					onClick={handleClick}
					onKeyUp={handleKeyUp}
					tabIndex={0}
					type="button"
				>
					<h3>I</h3>
				</button>
				<div className={`container-number-back ${getColorByAlcoholLevelClass}`}>
					<h3>{beer.abv.slice(0, -2)}%</h3>
				</div>
			</div>
		</div>
	);
};

export default BeerCard;
