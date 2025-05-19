import { io, type Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketState {
	socket: Socket | null;
	connect: () => void;
	disconnect: () => void;
}
const env = import.meta.env;

export const useSocketStore = create<SocketState>((set) => ({
	socket: null,
	connect: () => {
		const { VITE_SOCKET_URL } = env;

		const socket: Socket = io(VITE_SOCKET_URL, {
			reconnection: true,
			reconnectionDelay: 10000,
			reconnectionDelayMax: 15000,
		});

		set({ socket });
	},
	disconnect: () =>
		set((state) => {
			state.socket?.disconnect();

			return { socket: null };
		}),
}));
