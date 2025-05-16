export const SocketTopic = {
	CONNECT: "connect",
	DISCONNECT: "disconnect",
	// room topic
	ROOM_JOIN: "room:join",
	ROOM_LEAVE: "room:leave",
	// device topics
	DEVICE_LOCATION_LAST: "device-location:last",
} as const;
