import { Outlet } from "react-router-dom";

import "./App.css";

import Footer from "./component/Footer";
import Navigation from "./component/Nav";

import { FilteredAPIProvider } from "./context/FilteredAPI";
import { UserStatsProvider } from "./context/UserStats";

function App() {
	return (
		<>
			<Navigation />
			<UserStatsProvider>
				<FilteredAPIProvider>
					<Outlet />
				</FilteredAPIProvider>
			</UserStatsProvider>
			<Footer />
		</>
	);
}
export default App;
