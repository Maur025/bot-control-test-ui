import { useRoomStore } from "../store/useRoomStore";
import { SocketTopic } from "../socket-topic";
import { useSocketStore } from "../store/useSocketStore";

const { ROOM_JOIN, ROOM_LEAVE } = SocketTopic;

export const useSocketRoomHandler = () => {
	const { socket } = useSocketStore();
	const { currentRooms, joinRoom: join, leaveRoom: leave } = useRoomStore();

	const joinRoom = (room: string) => {
		join(room);
		socket?.emit(ROOM_JOIN, room);
	};

	const leaveRoom = (room: string) => {
		leave(room);
		socket?.emit(ROOM_LEAVE, room);
	};

	const reconnectRooms = () => {
		currentRooms.forEach((room) => {
			socket?.emit(ROOM_JOIN, room);
		});
	};

	const leaveAllRooms = () => {
		currentRooms.forEach((room) => {
			socket?.emit(ROOM_LEAVE, room);
		});
	};

	const getCurrentRooms = (): string[] => currentRooms;

	return { joinRoom, leaveRoom, reconnectRooms, leaveAllRooms, getCurrentRooms };
};
