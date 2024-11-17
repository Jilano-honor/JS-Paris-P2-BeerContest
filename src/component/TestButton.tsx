import "./TestButton.css";

const TestButton = () => {
	return (
		<button type="button" id="test-button">
			<p>
				Commencer <br />
				le test
			</p>
			<img src="src/assets/question-mark.png" alt="point d'interrogation" />
		</button>
	);
};

export default TestButton;
