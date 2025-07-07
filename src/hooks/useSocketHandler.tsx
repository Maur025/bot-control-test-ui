import { useEffect } from "react";
import type { Socket } from "socket.io-client";
import { SocketTopic } from "../socket-topic";
import { useUserIdHandler } from "./useUserIdHandler";

interface Request {
	socket: Socket | null;
	connect: () => void;
	disconnect: () => void;
	reconnectRooms: (userId?: string) => void;
	label: string;
}

const {
	CONNECT,
	DISCONNECT,
	ROOM_JOIN_RESPONSE,
	ROOM_LEAVE_RESPONSE,
	ROOM_JOIN_RESPONSE_GPS,
	ROOM_LEAVE_RESPONSE_GPS,
} = SocketTopic;

export const useSocketHandler = ({
	socket,
	connect,
	disconnect,
	reconnectRooms,
	label = "client",
}: Request) => {
	const { getUserId } = useUserIdHandler();

	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, [connect, disconnect]);

	useEffect(() => {
		if (!socket || !reconnectRooms) {
			return;
		}

		const handleConnect = (): void => {
			reconnectRooms(getUserId());
			console.log(`connected socket ${label} with id ${socket.id}`);
		};

		const handleDisconnect = (): void => {
			console.log(`socket ${label} disconected`);
		};

		const handleRoomJoin = (message: string): void => {
			console.log(`$[${label}] ${message}`);
		};

		const handleRoomLeave = (message: string): void => {
			console.log(`$[${label}] ${message}`);
		};

		socket.on(CONNECT, handleConnect);
		socket.on(DISCONNECT, handleDisconnect);

		if (label === "BOT") {
			socket.on(ROOM_JOIN_RESPONSE, handleRoomJoin);
			socket.on(ROOM_LEAVE_RESPONSE, handleRoomLeave);
		} else {
			socket.on(ROOM_JOIN_RESPONSE_GPS, handleRoomJoin);
			socket.on(ROOM_LEAVE_RESPONSE_GPS, handleRoomLeave);
		}

		return () => {
			socket.off(CONNECT, handleConnect);
			socket.off(DISCONNECT, handleDisconnect);
			socket.off(ROOM_JOIN_RESPONSE, handleRoomJoin);
			socket.off(ROOM_LEAVE_RESPONSE, handleRoomLeave);

			socket.off(ROOM_JOIN_RESPONSE_GPS, handleRoomJoin);
			socket.off(ROOM_LEAVE_RESPONSE_GPS, handleRoomLeave);
		};
	}, [socket, reconnectRooms, label, getUserId]);
};
