import { create } from "zustand";

interface RoomState {
	currentRooms: string[];
	joinRoom: (room: string) => void;
	leaveRoom: (room: string) => void;
	setRooms: (rooms: string[]) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
	currentRooms: [],
	joinRoom: (room) => {
		set((state) => ({ currentRooms: [...state.currentRooms, room] }));
	},
	leaveRoom: (room) => {
		set((state) => ({
			currentRooms: state.currentRooms.filter((roomCurrent) => room !== roomCurrent),
		}));
	},
	setRooms: (rooms) => {
		set({ currentRooms: [...rooms] });
	},
}));
