import { io, type Socket } from "socket.io-client";
import { create } from "zustand";
import { SocketTopic } from "../socket-topic";

interface SocketState {
	socket: Socket | null;
	connect: () => void;
	disconnect: () => void;
}

const { CONNECT, DISCONNECT } = SocketTopic;
const env = import.meta.env;

export const useSocketStore = create<SocketState>((set) => ({
	socket: null,
	connect: () => {
		const { VITE_SOCKET_URL } = env;

		const socket: Socket = io(VITE_SOCKET_URL);

		set({ socket });

		socket.on(CONNECT, () => {
			console.log(`Connected with id ${socket.id}`);
		});

		socket.on(DISCONNECT, () => {
			console.log("Socket disconected");
		});
	},
	disconnect: () =>
		set((state) => {
			state.socket?.disconnect();

			return { socket: null };
		}),
}));
