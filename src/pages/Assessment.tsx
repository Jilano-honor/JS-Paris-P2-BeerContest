import AssessmentButton from "../component/AssessmentButton";
import "./Assessment.css";

function Assessment() {
	return (
		<main id="main-assessment">
			<img
				src="src\assets\barman.png"
				alt="Mon personnage"
				className="character-image"
			/>

			<header id="header-home">
				<div className="entrance-game">
					<h1>Hello !</h1>
					<p className="header-txt">
						Je vais te poser quelques questions pour déterminer ton deck.
					</p>
					<AssessmentButton />
				</div>
			</header>
		</main>
	);
}
export default Assessment;
