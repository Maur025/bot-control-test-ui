import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import TestPage from "./pages/TestPage";
import { useEffect } from "react";
import { useSocketStore } from "./store/useSocketStore";
import { SocketTopic } from "./socket-topic";
import { useSocketRoomHandler } from "./hooks/useSocketRoomHandler";

const { CONNECT, DISCONNECT, ROOM_JOIN_RESPONSE, ROOM_LEAVE_RESPONSE } = SocketTopic;

function App() {
	const { connect, disconnect, socket } = useSocketStore();
	const { reconnectRooms } = useSocketRoomHandler();

	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, [connect, disconnect]);

	useEffect(() => {
		if (!socket || !reconnectRooms) {
			return;
		}

		socket.on(CONNECT, () => {
			reconnectRooms();
			console.log(`Connected with id ${socket.id}`);
		});

		socket.on(DISCONNECT, () => console.log("Socket disconected"));

		socket.on(ROOM_JOIN_RESPONSE, (message: string) => console.log(message));
		socket.on(ROOM_LEAVE_RESPONSE, (message: string) => console.log(message));

		return () => {
			socket.off(CONNECT);
			socket.off(DISCONNECT);
			socket.off(ROOM_JOIN_RESPONSE);
			socket.off(ROOM_LEAVE_RESPONSE);
		};
	}, [socket, reconnectRooms]);

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
