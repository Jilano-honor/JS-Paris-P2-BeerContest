import { useCallback, useEffect, useState } from "react";
import { useUserStats } from "../context/UserStats";

import assessmentResults from "../data/AssessmentResults";
import type BeerType from "../interface/BeerType";

import "./AssessmentResults.css";
import AssessmentResultButtons from "./AssessmentResultButtons";

interface filterBeersPerTypeProps {
	arrayOfBeers: BeerType[];
	type: string;
}

function AssessmentResult({
	setCurrentAssessmentStep,
}: { setCurrentAssessmentStep: React.Dispatch<React.SetStateAction<number>> }) {
	const { userAssessmentScore, BEER_CATEGORIES } = useUserStats();

	const maxValue = Math.max(...Object.values(userAssessmentScore));
	const userMaxKey = Object.keys(userAssessmentScore).find(
		(key) =>
			userAssessmentScore[key as keyof typeof userAssessmentScore] === maxValue,
	) as keyof typeof BEER_CATEGORIES;

	const sortedType = Object.entries(userAssessmentScore).sort(
		([, A], [, B]) => B - A,
	);

	const [exempleBeers, setExempleBeers] = useState<BeerType[] | null>(null);

	const filterBeersPerType = useCallback(
		({ arrayOfBeers, type }: filterBeersPerTypeProps) => {
			let filteredArray = [];
			if (type === "golden") {
				filteredArray = arrayOfBeers
					.filter((beer: BeerType) => beer.sub_category_2?.includes("Golden"))
					.slice(0, 3);
			} else if (type === "belgian") {
				filteredArray = arrayOfBeers
					.filter((beer: BeerType) => beer.sub_category_2?.includes("Belgian"))
					.slice(0, 3);
			} else if (type === "ale") {
				filteredArray = arrayOfBeers
					.filter(
						(beer: BeerType) =>
							beer.sub_category_2 === undefined ||
							beer.sub_category_2.includes("Pilsner") ||
							beer.sub_category_2.includes("Brown Ale") ||
							beer.sub_category_2.includes("Cream Ale"),
					)
					.slice(0, 3);
			} else if (type === "ipa") {
				filteredArray = arrayOfBeers
					.filter((beer: BeerType) => beer.sub_category_2?.includes("IPA"))
					.slice(0, 3);
			} else {
				filteredArray = arrayOfBeers
					.filter((beer: BeerType) => beer.sub_category_3?.includes("Hazy"))
					.slice(0, 3);
			}
			return filteredArray;
		},
		[],
	);

	const getExempleBeers = useCallback(() => {
		fetch("http://localhost:3000/data", {
			method: "GET",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data: BeerType[]) => {
				setExempleBeers(
					filterBeersPerType({ arrayOfBeers: data, type: userMaxKey }).slice(
						0,
						3,
					),
				);
			})
			.catch((error) => console.error("Erreur lors du fetch:", error));
	}, [filterBeersPerType, userMaxKey]);

	useEffect(() => {
		getExempleBeers();
	}, [getExempleBeers]);

	return (
		<header className="assessment-content">
			<h1>Bravo ! Tu es plutôt {BEER_CATEGORIES[userMaxKey]}</h1>
			<p>
				Tu es plutôt {BEER_CATEGORIES[userMaxKey]} à {maxValue * 10}%.
			</p>
			<p className="header-txt">
				{assessmentResults[userMaxKey].beerDescription}
			</p>
			<p className="header-txt">
				{assessmentResults[userMaxKey].userDescription}
			</p>
			<section id="assessment-results-lists">
				{exempleBeers ? (
					<div id="beers-exemple">
						<h3 className="header-txt">
							Quelques bières qui pourraient te plaire :
						</h3>
						<ul>
							{exempleBeers.map((beer) => (
								<li key={beer.sku}>{beer.name}</li>
							))}
						</ul>
					</div>
				) : (
					<></>
				)}
				<div id="full-result">
					<h3>Ton résultat complet :</h3>
					<ul>
						{sortedType.map((resultPerType) => (
							<li key={resultPerType[0]}>
								{BEER_CATEGORIES[
									resultPerType[0] as keyof typeof BEER_CATEGORIES
								]
									.charAt(0)
									.toUpperCase() +
									BEER_CATEGORIES[
										resultPerType[0] as keyof typeof BEER_CATEGORIES
									].slice(1)}
								: {resultPerType[1] * 10}%
							</li>
						))}
					</ul>
				</div>
			</section>
			<AssessmentResultButtons
				setCurrentAssessmentStep={setCurrentAssessmentStep}
			/>
		</header>
	);
}

export default AssessmentResult;
