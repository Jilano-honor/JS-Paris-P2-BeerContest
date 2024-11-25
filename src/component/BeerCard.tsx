import "./Beercard.css";

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
	const abvNumber = Number.parseFloat(beer.abv.replace("%", ""));
	const getColorByAlcoholLevel = (abvNumber: number) => {
		if (abvNumber < 4.99) return "var(--second-color)";
		if (abvNumber >= 5 && abvNumber < 7.99) return "var(--light-color)";
		return "var(--dark-color)";
	};

	return (
		<div
			className="beer-card"
			onClick={
				handleUserCardSelect ? () => handleUserCardSelect(beer) : undefined
			}
			onKeyUp={
				handleUserCardSelect ? () => handleUserCardSelect(beer) : undefined
			}
		>
			<div className="container-name">
				<h2>{beer.name}</h2>
			</div>

			<div
				className="container-number"
				style={{ backgroundColor: getColorByAlcoholLevel(abvNumber) }}
			>
				<h3>{beer.abv}</h3>
			</div>
			<div className="container-I-card">
				<h3>I</h3>
			</div>
		</div>
	);
};

export default BeerCard;
