import { Outlet } from "react-router-dom";

import "./App.css";

import Footer from "./component/Footer";
import Navigation from "./component/Nav";

import { UserStatsProvider } from "./context/UserStats";

function App() {
	return (
		<>
			<Navigation />
			<UserStatsProvider>
				<Outlet />
			</UserStatsProvider>
			<Footer />
		</>
	);
}
export default App;
