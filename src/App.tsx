import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import TestPage from "./pages/TestPage";
import { useSocketStore } from "./store/useSocketStore";
import { useSocketRoomHandler } from "./hooks/useSocketRoomHandler";
import { useSocketGpsStore } from "./store/useSocketGpsStore";
import { useRoomGpsHandler } from "./hooks/useRoomGpsHandler";
import { useSocketHandler } from "./hooks/useSocketHandler";
import GpsMonitor from "./pages/GpsMonitor";
import { useEffect } from "react";
import { useUserIdHandler } from "./hooks/useUserIdHandler";

function App() {
	const { initializeUserId } = useUserIdHandler();
	const { connect, disconnect, socket } = useSocketStore();
	const { reconnectRooms } = useSocketRoomHandler();

	const {
		connect: connectGps,
		disconnect: disconnectGps,
		socket: socketGps,
	} = useSocketGpsStore();
	const { reconnectRooms: reconnectGpsRooms } = useRoomGpsHandler();

	useSocketHandler({ socket, connect, disconnect, reconnectRooms, label: "BOT" });

	useSocketHandler({
		socket: socketGps,
		connect: connectGps,
		disconnect: disconnectGps,
		reconnectRooms: reconnectGpsRooms,
		label: "GPS",
	});

	useEffect(() => {
		if (!initializeUserId) {
			return;
		}

		initializeUserId();
	}, [initializeUserId]);

	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/gps-monitor" element={<GpsMonitor />} />
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
