import "./TestButton.css";

const TestButton = () => {
	return (
		<button type="button" id="test-button">
			<p>Commencer le test</p>
			<img src="src/assets/picto-test.png" alt="point d'interrogation" />
		</button>
	);
};

export default TestButton;
