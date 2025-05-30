import { create } from "zustand";

interface RoomState {
	currentRooms: string[];
	joinRoom: (room: string) => void;
	leaveRoom: (room: string) => void;
	setRooms: (rooms: string[]) => void;
}

export const useRoomGpsStore = create<RoomState>((set) => ({
	currentRooms: [],
	joinRoom: (room) => set((state) => ({ currentRooms: [...state.currentRooms, room] })),
	leaveRoom: (room) =>
		set((state) => ({
			currentRooms: state.currentRooms.filter((current) => current !== room),
		})),
	setRooms: (rooms) => set({ currentRooms: [...rooms] }),
}));
