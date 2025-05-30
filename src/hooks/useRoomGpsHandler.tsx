import { SocketTopic } from "../socket-topic";
import { useRoomGpsStore } from "../store/useRoomGpsStore";
import { useSocketGpsStore } from "../store/useSocketGpsStore";

const { ROOM_JOIN, ROOM_LEAVE } = SocketTopic;

export const useRoomGpsHandler = () => {
	const { socket } = useSocketGpsStore();
	const { currentRooms, joinRoom: join, leaveRoom: leave } = useRoomGpsStore();

	const joinRoom = (room: string): void => {
		join(room);
		socket?.emit(ROOM_JOIN, room);
	};

	const leaveRoom = (room: string): void => {
		leave(room);

		socket?.emit(ROOM_LEAVE, room);
	};

	const reconnectRooms = (): void => {
		currentRooms.map((room) => {
			socket?.emit(ROOM_JOIN, room);
		});
	};

	const leaveAllRooms = (): void => {
		currentRooms.map((room) => {
			socket?.emit(ROOM_LEAVE, room);
		});
	};

	const getCurrentRooms = (): string[] => currentRooms;

	return { joinRoom, leaveRoom, reconnectRooms, leaveAllRooms, getCurrentRooms };
};
