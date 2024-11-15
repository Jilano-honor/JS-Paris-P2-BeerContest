import { useCallback, useEffect, useState } from "react";

import "./GameSet.css";

interface BeerProps {
	sku: string;
	name: string;
	sub_category_1: string;
	sub_category_2?: string;
	sub_category_3?: string;
	country: string;
	abv: string;
	tasting_notes: string;
	food_pairing: string;
}

function GameSet() {
	const [beers, setBeers] = useState([]);
	const [decks, setDecks] = useState<[BeerProps[], BeerProps[]]>([[], []]);

	const getBeers = useCallback(() => {
		fetch("https://beer9.p.rapidapi.com/", {
			method: "GET",
			headers: {
				"x-rapidapi-key": "3d3ae33720msh1e9c565b73ea3f6p168475jsn91cc716d7ed8",
				"x-rapidapi-host": "beer9.p.rapidapi.com",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setBeers(data.data);
			})
			.catch((error) => console.error("Erreur lors du fetch:", error));
	}, []);

	const level = useCallback((deck: BeerProps[]) => {
		const deckAbv = deck.map((beer: BeerProps) =>
			Number.parseFloat(beer.abv.slice(-1)),
		);
		const sumAbv = deckAbv.reduce((acc, curr) => acc + curr, 0);
		return sumAbv;
	}, []);

	const createDecks = useCallback(
		(beers: BeerProps[]) => {
			const playerDeck = [];
			const computerDeck = [];
			do {
				playerDeck.length = 0;
				computerDeck.length = 0;
				for (let i = 0; i < 10; i++) {
					i < 5
						? playerDeck.push(beers[Math.floor(Math.random() * beers.length)])
						: computerDeck.push(
								beers[Math.floor(Math.random() * beers.length)],
							);
				}
				setDecks([playerDeck, computerDeck]);
			} while (Math.abs(level(playerDeck) - level(computerDeck)) > 2);
		},
		[level],
	);

	// Initializing the game

	useEffect(() => {
		getBeers();
	}, [getBeers]);

	useEffect(() => {
		if (beers.length > 0) {
			createDecks(beers);
		}
	}, [beers, createDecks]);

	// A UTILISER EN PHASE DE TEST POUR LIMITER LES APPELS A L'API ! METTRE EN COMMENTAIRE LES LIGNES 18 à 77 ET DECOMMENTER LES LIGNES 79 A 333
	// const decks = [
	// 	[
	// 		{
	// 			sku: "100060",
	// 			name: "Omission Ultimate Light Golden Ale",
	// 			brewery: "Omission",
	// 			rating: "4.5",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "Golden / Blonde Ale",
	// 			sub_category_3: "",
	// 			description:
	// 				"With only 3 carbs and 99 calories, Ultimate Light Golden Ale is smooth and easy drinking, but full of flavor.  Citrusy hops and clean finish leave you wanting more - and with our low calories and carbs, you can have another without feeling full.  Like all Omission beers, Ultimate Light is crafted to remove gluten.",
	// 			region: "Portland, Oregon",
	// 			country: "United States",
	// 			abv: "4.20%",
	// 			ibu: "",
	// 			calories_per_serving_12oz: "99",
	// 			carbs_per_serving_12oz: "3",
	// 			tasting_notes: "",
	// 			food_pairing: "Grilled chicken, Salad, Seafood",
	// 			suggested_glassware: "Pint Glass",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "Craft",
	// 			features: "",
	// 		},
	// 		{
	// 			sku: "100098",
	// 			name: "BJ's Brewhouse Blonde",
	// 			brewery: "BJ's Brewhouse",
	// 			rating: "",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "Golden / Blonde Ale",
	// 			sub_category_3: "",
	// 			description:
	// 				"A light and refreshing pale beer in the style of a German Kolsch. Slightly malty with delicate hopping to balance. Well-conditioned for exceptional smoothness and drinkability!",
	// 			region: "California",
	// 			country: "United States",
	// 			abv: "4.70%",
	// 			ibu: "15",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "",
	// 			food_pairing: "Chicken, Salad, Seafood",
	// 			suggested_glassware: "Pint Glass",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "",
	// 			features: "",
	// 		},
	// 		{
	// 			sku: "100040",
	// 			name: "Renegade Wit(h) Passion",
	// 			brewery: "Renegade Brewing",
	// 			rating: "",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "Belgian-Style Ale",
	// 			sub_category_3: "",
	// 			description:
	// 				"Our Belgian Style White Ale with Passion Fruit features a pleasant, light sweetness from the passion fruit that is balanced with the delicate herbal spice of coriander. Brightly carbonated and refreshingly crisp, with a dry, tart finish.",
	// 			region: "Denver",
	// 			country: "United States",
	// 			abv: "5.50%",
	// 			ibu: "19",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "",
	// 			food_pairing: "Spicy Thai food, Grilled shrimp, Lemon tart",
	// 			suggested_glassware: "Snifter/Goblet/Chalice",
	// 			serving_temp_f: "50-55° F",
	// 			serving_temp_c: "10.0-12.8° C",
	// 			beer_type: "",
	// 			features: "",
	// 		},
	// 		{
	// 			sku: "100065",
	// 			name: "Urban South Who Dat Golden Ale",
	// 			brewery: "Urban South Brewery",
	// 			rating: "4.6",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "Golden / Blonde Ale",
	// 			sub_category_3: "",
	// 			description:
	// 				"Who Dat Golden Ale is brewed with Pilsner and Flaked Barley and fermented with a hybrid yeast allowing this beer to ferment as an ale and then condition as a lager to create a crisp and refreshing beer. We added Citra and Hallertau Blanc in the kettle to give a punch of fragrant lemongrass, green grape and grapefruit!",
	// 			region: "Louisiana",
	// 			country: "United States",
	// 			abv: "5.00%",
	// 			ibu: "15",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "",
	// 			food_pairing: "Spicy Cajun cuisine, Grilled shrimp, Gumbo",
	// 			suggested_glassware: "Pint Glass",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "",
	// 			features: "",
	// 		},
	// 		{
	// 			sku: "100004",
	// 			name: "Great Divide Car Camper Hazy Pale Ale",
	// 			brewery: "Great Divide",
	// 			rating: "",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "IPA",
	// 			sub_category_3: "New England / Hazy IPA",
	// 			description:
	// 				"CAR CAMPER is the beer to fuel your next adventure. Generously hopped and dry-hopped with Sabro hops, the aroma hints at cantaloupe, mango\nand coconut and finishes evenly with a pleasant mouthfeel. Surrender to\nyour wanderlust and be sure to pack plenty of CAR CAMPER. 5.0% ABV",
	// 			region: "Denver, Colorado",
	// 			country: "United States",
	// 			abv: "5.00%",
	// 			ibu: "40",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "Coconut, Tropical",
	// 			food_pairing: "Spicy chicken wings, Grilled shrimp tacos, Citrus salad",
	// 			suggested_glassware: "Snifter/Goblet/Chalice",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "Craft, Independent Craft Brewer",
	// 			features: "",
	// 		},
	// 	],
	// 	[
	// 		{
	// 			sku: "100086",
	// 			name: "Buffalo Bayou Dreamsicle",
	// 			brewery: "Buffalo Bayou Brewing Co",
	// 			rating: "",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "Golden / Blonde Ale",
	// 			sub_category_3: "",
	// 			description:
	// 				"A blonde ale deepened with bright orange and sumptuous vanilla. Orange and vanilla complement each other perfectly resulting in a light-bodied refreshing treat to beat the Texas heat.",
	// 			region: "Houston, Texas",
	// 			country: "United States",
	// 			abv: "5.90%",
	// 			ibu: "35",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "",
	// 			food_pairing: "Spicy chicken wings, Grilled shrimp tacos, Citrus salad",
	// 			suggested_glassware: "Pint Glass",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "",
	// 			features: "",
	// 		},
	// 		{
	// 			sku: "100009",
	// 			name: "Machine House Golden Ale",
	// 			brewery: "Machine House Brewing",
	// 			rating: "",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "Golden / Blonde Ale",
	// 			sub_category_3: "",
	// 			description:
	// 				"One of our three year-round standard offerings. A refreshing Golden Ale, with a bright, crisp malt body and complex English hop character.",
	// 			region: "Seattle",
	// 			country: "United States",
	// 			abv: "4.50%",
	// 			ibu: "25",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "",
	// 			food_pairing: "Fish, Chicken, Salad",
	// 			suggested_glassware: "Pint Glass",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "Independent Craft Brewer",
	// 			features: "",
	// 		},
	// 		{
	// 			sku: "100042",
	// 			name: "Avery Island Rascal",
	// 			brewery: "Avery Brewing Company",
	// 			rating: "4.7",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "Belgian-Style Ale",
	// 			sub_category_3: "",
	// 			description:
	// 				"Inspired by our love for the tangy and bold passion fruit of Hawaii, Island Rascal combines the lusciousness of a Belgian-Style Wheat Ale with the juiciness and electric tingle of passion fruit. This golden explosion of fruity goodness is the perfect companion to breakfast, the beach, and of course BBQs!",
	// 			region: "Boulder, Colorado",
	// 			country: "United States",
	// 			abv: "5.40%",
	// 			ibu: "15",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "Fruity, Stone Fruit, Smooth, Tropical",
	// 			food_pairing: "Spicy Thai food, Grilled chicken, Sharp cheddar cheese",
	// 			suggested_glassware: "Pint Glass, Snifter/Goblet/Chalice",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "Independent Craft Brewer, Craft",
	// 			features: "",
	// 		},
	// 		{
	// 			sku: "100006",
	// 			name: "Bayou Teche Big Fatty",
	// 			brewery: "Bayou Teche Brewing",
	// 			rating: "",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "IPA",
	// 			sub_category_3: "New England / Hazy IPA",
	// 			description: "HAZY, JUICY, DANK, DON'T BOGART THIS IPA MY FRIEND",
	// 			region: "Arnaudville, Louisiana",
	// 			country: "United States",
	// 			abv: "8.00%",
	// 			ibu: "25",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "",
	// 			food_pairing: "Spicy Cajun dishes, Grilled sausages, Gumbo",
	// 			suggested_glassware: "Pint Glass, Snifter/Goblet/Chalice",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "",
	// 			features: "",
	// 		},
	// 		{
	// 			sku: "100067",
	// 			name: "Around The Bend Vixen Cream Ale",
	// 			brewery: "Around The Bend",
	// 			rating: "",
	// 			category: "Beer",
	// 			sub_category_1: "Ale",
	// 			sub_category_2: "Cream Ale",
	// 			sub_category_3: "",
	// 			description:
	// 				"Prepare For The Boom is a North East Triple India Pale Ale brewed with Domestic Row 2, Blond Roasted Oats and Flaked Wheat. Featuring ZERO Lactose, this one is hopped with Mosaic, Motueka and Wakatu then dry hopped with an obnoxious amount of Lupulin Mosaic, Moteuka and Wakatu. You definitely won't wanna protect ya neck from this brew. Huge aromatics of Candied Lime pop off the nose and lead into a hazy cacophony of Tropical Starburst, Lime and Stone Fruit notes through it's Oated Backbone.",
	// 			region: "Chicago",
	// 			country: "United States",
	// 			abv: "10.00%",
	// 			ibu: "15",
	// 			calories_per_serving_12oz: "",
	// 			carbs_per_serving_12oz: "",
	// 			tasting_notes: "",
	// 			food_pairing: "Spicy chicken wings, Grilled shrimp, Gouda cheese",
	// 			suggested_glassware: "Pint Glass",
	// 			serving_temp_f: "45-50° F",
	// 			serving_temp_c: "7.2-10.0° C",
	// 			beer_type: "",
	// 			features: "",
	// 		},
	// 	],
	// ];

	// Gameplay

	// End of game

	return (
		<>
			<button
				type="button"
				id="reload-decks"
				onClick={() => createDecks(beers)}
			>
				Recharger les decks
			</button>
			<section className="deck" id="user-deck">
				{decks[0].length > 0 ? (
					decks[0].map((beer) => (
						<article key={`player ${beer.sku}`} className="temp-card">
							<p>{beer.name}</p>
							<p>{beer.abv}</p>
						</article>
					))
				) : (
					<></>
				)}
			</section>
			<section id="game-area" />
			<section className="deck" id="computer-deck">
				{decks[1].length > 0 ? (
					decks[1].map((beer) => (
						<article key={`computer ${beer.sku}`} className="temp-card">
							<p>{beer.name}</p>
							<p>{beer.abv}</p>
						</article>
					))
				) : (
					<></>
				)}
			</section>
		</>
	);
}

export default GameSet;
