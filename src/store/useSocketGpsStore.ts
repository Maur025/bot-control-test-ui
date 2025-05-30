import { io, type Socket } from "socket.io-client";
import { create } from "zustand";
import { env } from "../config/env";

interface SocketState {
	socket: Socket | null;
	connect: () => void;
	disconnect: () => void;
}

const { VITE_SOCKET_GPS } = env;

export const useSocketGpsStore = create<SocketState>((set) => ({
	socket: null,
	connect: () => {
		const socket: Socket = io(VITE_SOCKET_GPS, {
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
