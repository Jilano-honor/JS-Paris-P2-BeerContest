import { useEffect } from "react";
import { useUserStats } from "../context/UserStats";

import assessmentResults from "../data/AssessmentResults";

import "./AssessmentResults.css";
import { useFilteredAPI } from "../context/FilteredAPI";
import AssessmentResultButtons from "./AssessmentResultButtons";

function AssessmentResult({
	setCurrentAssessmentStep,
}: { setCurrentAssessmentStep: React.Dispatch<React.SetStateAction<number>> }) {
	const { getFilteredBeers, beersFiltered } = useFilteredAPI();
	const { BEER_CATEGORIES, userMaxKey, maxValue, sortedType } = useUserStats();

	useEffect(() => {
		getFilteredBeers();
	}, [getFilteredBeers]);

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
				{beersFiltered ? (
					<div id="beers-exemple">
						<h3 className="header-txt">
							Quelques bières qui pourraient te plaire :
						</h3>
						<ul>
							{beersFiltered.slice(0, 3).map((beer) => (
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
