export const SocketTopic = {
	CONNECT: "connect",
	DISCONNECT: "disconnect",
	// room topic
	ROOM_JOIN: "room:join",
	ROOM_LEAVE: "room:leave",
	ROOM_JOIN_RESPONSE: "room:join-response",
	ROOM_LEAVE_RESPONSE: "room:leave-response",
	// device topics
	DEVICE_LOCATION_LAST: "device-location:last",
} as const;
