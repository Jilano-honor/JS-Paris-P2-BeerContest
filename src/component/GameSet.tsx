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

	// Gameplay

	// End of game

	return (
		<>
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
			<section className="deck" id="user-deck">
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
