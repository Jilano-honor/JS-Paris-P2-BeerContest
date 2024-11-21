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
	gameStates: { start: number; ingame: number; end: number };
	currentGameState: number;
	setCurrentGameState: React.Dispatch<React.SetStateAction<number>>;
	setAlcoholLevel: React.Dispatch<React.SetStateAction<number>>;
}

function GameSet({
	currentGameState,
	gameStates,
	setCurrentGameState,
	setAlcoholLevel,
}: GameSetProps) {
	const [beers, setBeers] = useState([]);
	const [decks, setDecks] = useState<{
		user: BeerProps[];
		computer: BeerProps[];
	}>({ user: [], computer: [] });

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
				setDecks({ user: playerDeck, computer: computerDeck });
			} while (Math.abs(level(playerDeck) - level(computerDeck)) > 2);
		},
		[level],
	);

	// Initializing the game

	useEffect(() => {
		getBeers();
	}, [getBeers]);

	useEffect(() => {
		if (beers.length > 0 && currentGameState === gameStates.ingame) {
			createDecks(beers);
		}
	}, [beers, createDecks, currentGameState, gameStates.ingame]);

	// Gameplay

	const [userCard, setUserCard] = useState<BeerProps | null>(null);
	const [computerCard, setComputerCard] = useState<BeerProps | null>(null);
	const [roundMsg, setRoundMsg] = useState<string | null>(null);
	const ROUND_WINNER = { computer: 0, equality: 1, user: 2 };

	const compareCard = (
		userCard: BeerProps,
		computerCard: BeerProps,
		ROUND_WINNER: { computer: number; equality: number; user: number },
	) => {
		const computerAbv = Number.parseFloat(computerCard.abv.replace("%", ""));
		const userAbv = Number.parseFloat(userCard.abv.replace("%", ""));

		let roundResult: { winner: number; message: string };

		if (computerAbv === userAbv) {
			roundResult = {
				winner: ROUND_WINNER.equality,
				message: "C'est égalité !",
			};
		} else if (computerAbv < userAbv) {
			roundResult = { winner: ROUND_WINNER.computer, message: "C'est perdu !" };
		} else {
			roundResult = { winner: ROUND_WINNER.user, message: "C'est gagné !" };
		}

		return roundResult;
	};

	const updateAlcoholLevel = (winner: number, userCard: BeerProps) => {
		if (winner === ROUND_WINNER.computer) {
			const userAbv = Number.parseFloat(userCard.abv.replace("%", ""));
			setAlcoholLevel((prev) => prev + userAbv);
		}
	};

	const handleUserCardSelect = (selectedCard: BeerProps) => {
		const computerSelectedCard =
			decks.computer[Math.floor(Math.random() * decks.computer.length)];

		decks.user = decks.user.filter((beer) => beer.sku !== selectedCard.sku);
		decks.computer = decks.computer.filter(
			(beer) => beer.sku !== computerSelectedCard.sku,
		);

		setUserCard(selectedCard);
		setComputerCard(computerSelectedCard);

		const roundResult = compareCard(
			selectedCard,
			computerSelectedCard,
			ROUND_WINNER,
		);
		updateAlcoholLevel(roundResult.winner, selectedCard);
		setRoundMsg(roundResult.message);
		if (decks.user.length === 0) {
			endGame();
		}
	};

	// End of game

	const endGame = () => {
		setCurrentGameState(gameStates.end);
		setRoundMsg(null);
	};

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
				{decks.computer.length > 0 ? (
					decks.computer.map((beer) => (
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
				{decks.user.length > 0 ? (
					decks.user.map((beer) => (
						<button
							type="button"
							className="button-user-cards"
							key={`player ${beer.sku}`}
							onClick={() => handleUserCardSelect(beer)}
							tabIndex={0}
							onKeyDown={(event) => {
								if (event.key === " ") {
									handleUserCardSelect(beer);
								}
							}}
						>
							<article className="temp-card">
								<p>{beer.name}</p>
								<p>{beer.abv}</p>
							</article>
						</button>
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
