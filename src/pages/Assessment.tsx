import { useState } from "react";

import AssessmentButton from "../component/AssessmentButton";
import assessmentContent from "../data/AssessmentContent";

import "./Assessment.css";

function Assessment() {
	const TEST_STEPS: Record<string, number> = { startTest: 0, endTest: 11 };
	for (let i = 1; i <= 10; i++) {
		TEST_STEPS[`question${i}`] = i;
	}

	const [currentAssessmentStep, setCurrentAssessmentStep] = useState<number>(
		TEST_STEPS.startTest,
	);

	const [userScore, setUserScore] = useState<{
		golden: number;
		belgian: number;
		ale: number;
		ipa: number;
		hazy: number;
	}>({
		golden: 0,
		belgian: 0,
		ale: 0,
		ipa: 0,
		hazy: 0,
	});

	const questionKey =
		`question${currentAssessmentStep}` as keyof typeof assessmentContent;

	return (
		<main id="main-assessment">
			<img
				src="src\assets\barman.png"
				alt="Mon personnage"
				className="character-image"
			/>

			{currentAssessmentStep === TEST_STEPS.startTest ? (
				<header className="assessment-content" id="assessment-intro">
					<h1>Hello !</h1>
					<p className="header-txt">
						Je vais te poser quelques questions pour déterminer ton deck.
					</p>
					<AssessmentButton
						setCurrentAssessmentStep={setCurrentAssessmentStep}
					/>
				</header>
			) : currentAssessmentStep === TEST_STEPS.endTest ? (
				<header className="assessment-content">
					<h1>Bravo !</h1>
					<p className="header-txt">Voici votre résultat :</p>
				</header>
			) : (
				<header className="assessment-content">
					<p className="header-txt">
						{assessmentContent[questionKey].question}
					</p>
					<div className="assessment-answers">
						{assessmentContent[questionKey].answer.map(
							(answer: {
								type: "golden" | "belgian" | "ale" | "ipa" | "hazy";
								sentence: string;
							}) => (
								<button
									key={answer.type}
									type="button"
									onClick={() => {
										setCurrentAssessmentStep((prevStep) => prevStep + 1);
										setUserScore((prev) => ({
											...prev,
											[answer.type]: prev[answer.type] + 1,
										}));
									}}
									onKeyUp={(event) => {
										if (event.key === " " || event.key === "enter") {
											setCurrentAssessmentStep((prevStep) => prevStep + 1);
											setUserScore((prev) => ({
												...prev,
												[answer.type]: prev[answer.type] + 1,
											}));
										}
									}}
								>
									{answer.sentence}
								</button>
							),
						)}
					</div>
				</header>
			)}
		</main>
	);
}
export default Assessment;
