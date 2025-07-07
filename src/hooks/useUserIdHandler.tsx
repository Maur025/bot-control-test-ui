import { useUserIdStore } from "../store/useUserIdStore";
import { v4 as uuidv4 } from "uuid";

export const useUserIdHandler = () => {
	const { userId, setUserId, clearUserId } = useUserIdStore();

	const initializeUserId = (): void => {
		if (userId) {
			console.info("userId already set");
			return;
		}

		const sessionUserId = sessionStorage.getItem("app-id");

		if (sessionUserId) {
			setUserId(sessionUserId);

			return;
		}

		const newUserId = uuidv4();

		setUserId(newUserId);
		sessionStorage.setItem("app-id", newUserId);
	};

	const getUserId = (): string => {
		if (!userId) {
			console.warn("userId not set");
			return "";
		}

		return userId;
	};

	return { initializeUserId, clearUserId, getUserId };
};
