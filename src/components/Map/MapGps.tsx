import { useEffect, useMemo, useRef, type JSX } from "react";
import { useCurrentPosition } from "./useCurrentPosition";
import VectorSource from "ol/source/Vector";
import { useMap } from "./useMap";
import { useSocketGpsStore } from "../../store/useSocketGpsStore";
import { SocketTopic } from "../../socket-topic";

const { MESSAGE, DEVICES } = SocketTopic;

const MapGps = (): JSX.Element => {
	const elementMapRef = useRef<HTMLDivElement>(null);

	const { currentPosition } = useCurrentPosition();
	const gpsVectorSource = useMemo(() => new VectorSource(), []);

	const { socket } = useSocketGpsStore();

	useEffect(() => {
		if (!socket) {
			return;
		}

		socket.emit(MESSAGE, "conectando para recibir dispositivos");

		socket.on(DEVICES, (payload) => {
			console.log(payload);
		});

		return () => {
			socket.off(DEVICES);
		};
	}, [socket]);

	useMap({
		containerRef: elementMapRef,
		position: currentPosition,
		deviceVectorSource: gpsVectorSource,
	});

	return <div ref={elementMapRef} className="w-full h-full z-50" />;
};

export default MapGps;
