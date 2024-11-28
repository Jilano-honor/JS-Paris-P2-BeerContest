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

	const handleClick = () => {
		setCurrentAssessmentStep((prevStep) => prevStep + 1);
		setUserAssessmentScore((prev) => ({
			...prev,
			[answer.type]: prev[answer.type] + 1,
		}));
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			onKeyUp={(event) => {
				if (event.key === " " || event.key === "enter") {
					handleClick();
				}
			}}
		>
			{answer.sentence}
		</button>
	);
}

export default AssessmentAnswers;
