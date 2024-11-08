import { createRoot } from "react-dom/client";
import "./index.css";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Game from "./pages/Game";
import Home from "./pages/Home";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/Game",
				element: <Game />,
			},
		],
	},
]);
const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(<RouterProvider router={router} />);
} else {
	console.error("Root element not found!");
}
