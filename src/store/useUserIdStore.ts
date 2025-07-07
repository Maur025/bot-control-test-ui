import { create } from "zustand";

interface UserIdState {
	userId: string | null;
	setUserId: (userId: string) => void;
	clearUserId: () => void;
}

export const useUserIdStore = create<UserIdState>((set) => ({
	userId: null,
	setUserId: (userId) => {
		set({ userId });
	},
	clearUserId: () => {
		set({ userId: null });
	},
}));
