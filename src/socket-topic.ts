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
	// capture topics
	MESSAGE: "message",
	DEVICES: "devices",
	DEVICE: "device",
	DEVICE_NEW: "device.new",
	DEVICE_REMOVE: "device.remove",
	DEVICE_TRACKS: "device.tracks",
	DEVICE_SETUP: "device.setup",
	DEVICE_STATE: "device.state",
	DEVICE_CONFIG: "device.config",
	DEVICE_LAST: "device.last",
	DEVICE_CLEARED: "device.cleared",
	DEVICE_TRACK_END: "device.track.end",
	DEVICE_UNSUBSCRIBE: "device.unsubscribe",
	DEVICE_UNSUBSCRIBE_ALL: "device.unsubscribe.all",
	DEVICE_SUBSCRIBE: "device.subscribe",
} as const;
