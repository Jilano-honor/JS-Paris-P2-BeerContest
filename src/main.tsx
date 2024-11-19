import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";

import "./reset.css";
import "./index.css";

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
			{
				path: "/Test",
				element: <Assessment />,
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
