import { useEffect, useMemo, useRef, type JSX } from "react";
import { useCurrentPosition } from "./useCurrentPosition";
import VectorSource from "ol/source/Vector";
import { useMap } from "./useMap";
import { useSocketGpsStore } from "../../store/useSocketGpsStore";
import { SocketTopic } from "../../socket-topic";
import { SocketRoom } from "../../socket-room";
import { useRoomGpsHandler } from "../../hooks/useRoomGpsHandler";

const { MESSAGE, DEVICES, VEHICLE_SORTBY_GEOFENCE_RESPONSE, VEHICLE_SORTBY_GROUP_RESPONSE } =
	SocketTopic;

const { DEVICE_MONITORING_ROOM } = SocketRoom;

const MapGps = (): JSX.Element => {
	const elementMapRef = useRef<HTMLDivElement>(null);

	const { currentPosition } = useCurrentPosition();
	const { joinRoom, leaveRoom } = useRoomGpsHandler();

	const gpsVectorSource = useMemo(() => new VectorSource(), []);

	const { socket } = useSocketGpsStore();

	useEffect(() => {
		if (!socket) {
			return;
		}

		joinRoom(DEVICE_MONITORING_ROOM);

		const handleOnDevices = (payload: unknown): void => {
			console.log("DEVICES", payload);
		};

		const handleOnVehiclesGroup = (payload: unknown): void => {
			console.log("VEHICLES GROUP", payload);
		};

		const handleOnVehiclesGeofence = (payload: unknown): void => {
			console.log("VEHICLES GEOFENCE", payload);
		};

		socket.emit(MESSAGE, "conectando para recibir dispositivos");
		socket.on(DEVICES, handleOnDevices);
		socket.on(VEHICLE_SORTBY_GEOFENCE_RESPONSE, handleOnVehiclesGeofence);
		socket.on(VEHICLE_SORTBY_GROUP_RESPONSE, handleOnVehiclesGroup);

		return () => {
			leaveRoom(DEVICE_MONITORING_ROOM);
			socket.off(DEVICES, handleOnDevices);
			socket.off(VEHICLE_SORTBY_GEOFENCE_RESPONSE, handleOnVehiclesGeofence);
			socket.off(VEHICLE_SORTBY_GROUP_RESPONSE, handleOnVehiclesGroup);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	useMap({
		containerRef: elementMapRef,
		position: currentPosition,
		deviceVectorSource: gpsVectorSource,
	});

	return <div ref={elementMapRef} className="w-full h-full z-50" />;
};

export default MapGps;
