import { SocketTopic } from "../socket-topic";
import { useRoomGpsStore } from "../store/useRoomGpsStore";
import { useSocketGpsStore } from "../store/useSocketGpsStore";

const { ROOM_JOIN_REQUEST_GPS, ROOM_LEAVE_REQUEST_GPS } = SocketTopic;

export const useRoomGpsHandler = () => {
	const { socket } = useSocketGpsStore();
	const { currentRooms, joinRoom: join, leaveRoom: leave } = useRoomGpsStore();

	const joinRoom = (room: string, userId?: string): void => {
		join(room);
		socket?.emit(ROOM_JOIN_REQUEST_GPS, room, userId);
	};

	const leaveRoom = (room: string, userId?: string): void => {
		leave(room);

		socket?.emit(ROOM_LEAVE_REQUEST_GPS, room, userId);
	};

	const reconnectRooms = (userId?: string): void => {
		currentRooms.map((room) => {
			socket?.emit(ROOM_JOIN_REQUEST_GPS, room, userId);
		});
	};

	const leaveAllRooms = (userId?: string): void => {
		currentRooms.map((room) => {
			socket?.emit(ROOM_LEAVE_REQUEST_GPS, room, userId);
		});
	};

	const getCurrentRooms = (): string[] => currentRooms;

	return { joinRoom, leaveRoom, reconnectRooms, leaveAllRooms, getCurrentRooms };
};
