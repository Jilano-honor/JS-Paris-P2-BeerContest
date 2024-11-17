import TestButton from "../component/TestButton";
import "./Test.css";

function Test() {
	return (
		<main id="main-test">
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
					<TestButton />
				</div>
			</header>
		</main>
	);
}
export default Test;
