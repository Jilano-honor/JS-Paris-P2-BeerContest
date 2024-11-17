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

interface GameSetProps {
	setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
	setAlcoholLevel: React.Dispatch<React.SetStateAction<number>>;
}

function GameSet({ setPopUp, setAlcoholLevel }: GameSetProps) {
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

	const [userCard, setUserCard] = useState<BeerProps | null>(null);
	const [computerCard, setComputerCard] = useState<BeerProps | null>(null);
	const [roundMsg, setRoundMsg] = useState<string | null>(null);

	const compareCard = (userCard: BeerProps, computerCard: BeerProps) => {
		const computerAbv = Number.parseFloat(computerCard.abv.replace("%", ""));
		const userAbv = Number.parseFloat(userCard.abv.replace("%", ""));
		let result = "";
		if (computerAbv === userAbv) {
			setRoundMsg("C'est égalité !");
			result = "egalité";
		} else if (computerAbv < userAbv) {
			setRoundMsg("C'est perdu !");
			result = "computer";
		} else {
			setRoundMsg("C'est gagné !");
			result = "user";
		}
		return result;
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
		if (newUserDeck.length === 0) {
			setPopUp(true);
		}
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
						<article
							key={`computer ${beer.sku}-${Math.random()}`}
							className="temp-card"
						>
							<p>{beer.name}</p>
							<p>{beer.abv}</p>
						</article>
					))
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
						<></>
					)}
				</div>
				<div id="user-selected-card">
					{userCard ? (
						<div>
							<p>{userCard.name}</p>
							<p>ABV: {userCard.abv}</p>
						</div>
					) : (
						<h3 id="pick-card">
							Choisis une carte <br />v
						</h3>
					)}
				</div>
			</section>
			<section className="deck" id="user-deck">
				{decks[0].length > 0 ? (
					decks[0].map((beer) => (
						<article
							key={`player ${beer.sku}`}
							className="temp-card"
							onClick={() => handleUserCardSelect(beer)}
							onKeyDown={() => handleUserCardSelect(beer)}
						>
							<p>{beer.name}</p>
							<p>{beer.abv}</p>
						</article>
					))
				) : (
					<></>
				)}
			</section>
			{roundMsg ? (
				<div id="round-msg">
					<h3>{roundMsg}</h3>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default GameSet;
