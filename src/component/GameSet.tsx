import { useCallback, useEffect, useState } from "react";

import "./GameSet.css";

import imagealcohollevel from "./../assets/Beer-game-AlcoholLeve.png";

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
		return computerAbv < userAbv ? "computer" : "user";
	};

	const updateAlcoholLevel = (winner: string, userCard: BeerProps) => {
		if (winner === "computer") {
			const userAbv = Number.parseFloat(userCard.abv.replace("%", ""));
			setAlcoholLevel((prev) => prev + userAbv);
		}
	};
	useEffect(() => {
		if (alcoholLevel >= 15) {
			setDecks(([userDeck, computerDeck]) => [
				shuffleDeck(userDeck),
				shuffleDeck(computerDeck),
			]);
		}
	}, [alcoholLevel]);
	const shuffleDeck = (deck: BeerProps[]) => {
		const shuffledDeck = [...deck];
		for (let i = shuffledDeck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
		}
		return shuffledDeck;
	};

	const handleUserCardSelect = (selectedCard: BeerProps) => {
		const updatedComputerDeck = decks[1];
		const updatedUserDeck = decks[0];

		const computerSelectedCard =
			updatedComputerDeck[
				Math.floor(Math.random() * updatedComputerDeck.length)
			];

		const userCardIndex = updatedUserDeck.findIndex(
			(beer) => beer.sku === selectedCard.sku,
		);
		const newUserDeck = [
			...updatedUserDeck.slice(0, userCardIndex),
			...updatedUserDeck.slice(userCardIndex + 1),
		];
		const computerCardIndex = updatedComputerDeck.findIndex(
			(beer) => beer.sku === computerSelectedCard.sku,
		);
		const newComputerDeck = [
			...updatedComputerDeck.slice(0, computerCardIndex),
			...updatedComputerDeck.slice(computerCardIndex + 1),
		];

		setDecks([newUserDeck, newComputerDeck]);

		setUserCard(selectedCard);
		setComputerCard(computerSelectedCard);

		const roundWinner = compareCard(selectedCard, computerSelectedCard);
		updateAlcoholLevel(roundWinner, selectedCard);
	};

	//Alcohol level

	// End of game

	return (
		<>
			<section id="game-alcohol-level">
				<img
					src={imagealcohollevel}
					alt="imagealcohollevel"
					id="imagealcohollevel"
				/>
				<div id="progresse-bar">
					<div id="verticale-bar" style={{ height: `${alcoholLevel} ` * 4.5 }}>
						{alcoholLevel}%
					</div>
				</div>
			</section>
			<button
				type="button"
				id="reload-decks"
				onClick={() => createDecks(beers)}
			>
				Recharger les decks
			</button>
			<section className="deck" id="computer-deck">
				{decks[1].length > 0 ? (
					decks[1].map((beer) => {
						let drunkEffectClass = "";
						if (alcoholLevel >= 5 && alcoholLevel < 10) {
							drunkEffectClass = "drunk-light";
						} else if (alcoholLevel >= 10 && alcoholLevel < 15) {
							drunkEffectClass = "drunk-medium";
						} else if (alcoholLevel >= 15 && alcoholLevel < 20) {
							drunkEffectClass = "drunk-high";
						} else if (alcoholLevel >= 20 && alcoholLevel < 25) {
							drunkEffectClass = "drunk-very-high";
						} else if (alcoholLevel >= 25) {
							drunkEffectClass = "drunk-extreme";
						}

						return (
							<article
								key={`computer ${beer.sku}`}
								className={`temp-card ${drunkEffectClass}`}
							>
								<p>{beer.name}</p>
								<p>{beer.abv}%</p>
							</article>
						);
					})
				) : (
					<></>
				)}
			</section>

			<section id="game-area">
				<div id="computer-selected-card">
					{computerCard ? (
						<div>
							<p>{computerCard.name}</p>
							<p>ABV: {computerCard.abv}</p>
						</div>
					) : (
						<p>en attente de ta card</p>
					)}
				</div>
				<div id="user-selected-card">
					{userCard ? (
						<div>
							<p>{userCard.name}</p>
							<p>ABV: {userCard.abv}</p>
						</div>
					) : (
						<p>Choisi une card</p>
					)}
				</div>
			</section>
			<section className="deck" id="user-deck">
				{decks[0].length > 0 ? (
					decks[0].map((beer) => {
						let drunkEffectClass = "";
						if (alcoholLevel >= 5 && alcoholLevel < 10) {
							drunkEffectClass = "drunk-light";
						} else if (alcoholLevel >= 10 && alcoholLevel < 15) {
							drunkEffectClass = "drunk-medium";
						} else if (alcoholLevel >= 15 && alcoholLevel < 20) {
							drunkEffectClass = "drunk-high";
						} else if (alcoholLevel >= 20 && alcoholLevel < 25) {
							drunkEffectClass = "drunk-very-high";
						} else if (alcoholLevel >= 25) {
							drunkEffectClass = "drunk-extreme";
						}

						return (
							// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
							<article
								key={`player-${beer.sku}`}
								className={`temp-card ${drunkEffectClass}`}
								onClick={() => handleUserCardSelect(beer)}
							>
								<p>{beer.name}</p>
								<p>{beer.abv}</p>
							</article>
						);
					})
				) : (
					<></>
				)}
			</section>
		</>
	);
}

export default GameSet;
