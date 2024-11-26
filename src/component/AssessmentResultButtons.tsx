import { Link } from "react-router-dom";

import "./AssessmentResultButtons.css";

import logoBeer from "../assets/picto-beer.png";
import { useUserStats } from "../context/UserStats";

function AssessmentResultButtons({
	setCurrentAssessmentStep,
}: { setCurrentAssessmentStep: React.Dispatch<React.SetStateAction<number>> }) {
	const { setUserAssessmentScore } = useUserStats();

	const restartAssessment = () => {
		setCurrentAssessmentStep(0);
		setUserAssessmentScore({
			golden: 0,
			belgian: 0,
			ale: 0,
			ipa: 0,
			hazy: 0,
		});
	};

	return (
		<section id="assessment-result-buttons">
			<Link to="/game" id="assessment-to-game-button">
				<p>Jouer</p>
				<img src={logoBeer} id="logo-beer" alt="bières" />
			</Link>
			<button
				id="redo-assessment-button"
				type="button"
				onClick={restartAssessment}
			>
				Recommencer le test
			</button>
		</section>
	);
}

export default AssessmentResultButtons;
