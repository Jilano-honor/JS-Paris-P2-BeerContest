import { useUserStats } from "../context/UserStats";

interface AssessmentAnswersType {
	answer: {
		type: "golden" | "belgian" | "ale" | "ipa" | "hazy";
		sentence: string;
	};
	setCurrentAssessmentStep: React.Dispatch<React.SetStateAction<number>>;
}

function AssessmentAnswers({
	answer,
	setCurrentAssessmentStep,
}: AssessmentAnswersType) {
	const { setUserAssessmentScore } = useUserStats();

	return (
		<button
			type="button"
			onClick={() => {
				setCurrentAssessmentStep((prevStep) => prevStep + 1);
				setUserAssessmentScore((prev) => ({
					...prev,
					[answer.type]: prev[answer.type] + 1,
				}));
			}}
			onKeyUp={(event) => {
				if (event.key === " " || event.key === "enter") {
					setCurrentAssessmentStep((prevStep) => prevStep + 1);
					setUserAssessmentScore((prev) => ({
						...prev,
						[answer.type]: prev[answer.type] + 1,
					}));
				}
			}}
		>
			{answer.sentence}
		</button>
	);
}

export default AssessmentAnswers;
