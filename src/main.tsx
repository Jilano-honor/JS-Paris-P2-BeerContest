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

createRoot(document.getElementById("root") || document.body).render(
	<RouterProvider router={router} />,
);
