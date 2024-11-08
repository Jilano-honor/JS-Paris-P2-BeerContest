import "./reset.css";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navigation from "./component/Nav";

function App() {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	);
}
export default App;
