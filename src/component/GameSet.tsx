import { useCallback, useEffect, useState } from "react";

import "./GameSet.css";
import BeerCard from "./BeerCard";

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
		fetch("http://localhost:3000/data", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setBeers(data);
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

	const [alcoholLevel, setAlcoholLevel] = useState(0);
	const [userCard, setUserCard] = useState<BeerProps | null>(null);
	const [computerCard, setComputerCard] = useState<BeerProps | null>(null);

	const compareCard = (userCard: BeerProps, computerCard: BeerProps) => {
		const computerAbv = Number.parseFloat(computerCard.abv.replace("%", ""));
		const userAbv = Number.parseFloat(userCard.abv.replace("%", ""));
		if (computerAbv === userAbv) {
			return "egalité";
		}
		return computerAbv > userAbv ? "computer" : "user";
	};

	const updateAlcoholLevel = (winner: string, userCard: BeerProps) => {
		if (winner === "computer") {
			const userAbv = Number.parseFloat(userCard.abv.replace("%", ""));
			setAlcoholLevel((prev) => prev + userAbv);
		}
	};

	const handleUserCardSelect = (selectedCard: BeerProps) => {
		const updatedComputerDeck = decks[1];
		const updatedUserDeck = decks[0];

		const computerSelectedCard =
			updatedComputerDeck[
				Math.floor(Math.random() * updatedComputerDeck.length)
			];

		const newUserDeck = updatedUserDeck.filter(
			(beer) => beer.sku !== selectedCard.sku,
		);
		const newComputerDeck = updatedComputerDeck.filter(
			(beer) => beer.sku !== computerSelectedCard.sku,
		);

		setDecks([newUserDeck, newComputerDeck]);

		setUserCard(selectedCard);
		setComputerCard(computerSelectedCard);

		const roundWinner = compareCard(selectedCard, computerSelectedCard);
		updateAlcoholLevel(roundWinner, selectedCard);
	};

	const round = (userSelectedCard: BeerProps) => {
		handleUserCardSelect(userSelectedCard);
	};

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
			<section className="deck" id="computer-deck">
				{decks[1].length > 0 ? (
					decks[1].map((beer) => (
						<BeerCard
							key={`computer ${beer.sku}-${Math.random()}`}
							beer={beer}
						/>
					))
				) : (
					<></>
				)}
			</section>
			<section id="game-area">
				<div id="computer-selected-card">
					{computerCard ? (
						<BeerCard beer={computerCard} />
					) : (
						<p>en attente de ta card</p>
					)}
				</div>
				<div id="user-selected-card">
					{userCard ? <BeerCard beer={userCard} /> : <p>Choisi une card</p>}
				</div>
			</section>
			<section className="deck" id="user-deck">
				{decks[0].length > 0 ? (
					decks[0].map((beer) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<BeerCard
							key={`player-${beer.sku}-${Math.random()}`}
							beer={beer}
							handleUserCardSelect={handleUserCardSelect}
						/>
					))
				) : (
					<></>
				)}
			</section>
		</>
	);
}

export default GameSet;
