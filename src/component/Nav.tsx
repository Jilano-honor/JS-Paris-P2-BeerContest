import { Link } from "react-router-dom";

import "../component/Nav.css";

import logo from "../assets/Beer Contest.png";
import home from "../assets/picto-home.png";
import play from "../assets/picto-game.png";
import question from "../assets/picto-test.png";
import information from "../assets/picto-about.png";

function Navigation() {
	return (
		<nav id="navigation-bar">
			<img src={logo} alt="Logo" id="logo" />
			<Link to="/">
				<img src={home} alt="Accueil" className="nav-img" />
				<p>Accueil</p>
			</Link>
			<Link to="/game">
				<img src={play} alt="Jouer" className="nav-img" />
				<p>Jouer</p>
			</Link>
			<Link to="/test">
				<img src={question} alt="Test" className="nav-img" />
				<p>Test</p>
			</Link>
			<Link to="/about">
				<img src={information} alt="A propos" className="nav-img" />
				<p>A propos</p>
			</Link>
		</nav>
	);
}

export default Navigation;
