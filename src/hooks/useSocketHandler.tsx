import { useEffect } from "react";
import type { Socket } from "socket.io-client";
import { SocketTopic } from "../socket-topic";

interface Request {
	socket: Socket | null;
	connect: () => void;
	disconnect: () => void;
	reconnectRooms: () => void;
	label: string;
}

const { CONNECT, DISCONNECT, ROOM_JOIN_RESPONSE, ROOM_LEAVE_RESPONSE } = SocketTopic;

export const useSocketHandler = ({
	socket,
	connect,
	disconnect,
	reconnectRooms,
	label = "client",
}: Request) => {
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
			reconnectRooms();
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
		socket.on(ROOM_JOIN_RESPONSE, handleRoomJoin);
		socket.on(ROOM_LEAVE_RESPONSE, handleRoomLeave);

		return () => {
			socket.off(CONNECT, handleConnect);
			socket.off(DISCONNECT, handleDisconnect);
			socket.off(ROOM_JOIN_RESPONSE, handleRoomJoin);
			socket.off(ROOM_LEAVE_RESPONSE, handleRoomLeave);
		};
	}, [socket, reconnectRooms, label]);
};
