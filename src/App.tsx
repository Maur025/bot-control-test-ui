import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import TestPage from "./pages/TestPage";

function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/bot" element={<TestPage />} />
						<Route path="/graphics" element={<TestPage />} />
						<Route path="/notifications" element={<TestPage />} />
						<Route path="/settings" element={<TestPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
