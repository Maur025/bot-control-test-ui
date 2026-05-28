import type { JSX } from "react";
import { useEffect, useMemo, useRef } from "react";
import { useCurrentPosition } from "./useCurrentPosition";
import { useMap } from "./useMap";
import { useDeviceMarkers } from "./useDeviceMarkers";
import VectorSource from "ol/source/Vector";
import { useSocketStore } from "../../store/useSocketStore";
import type { MapBrowserEvent } from "ol";
import { useDeviceStore } from "../../store/useDevicesStore";
import type { Device } from "../../models/device-response";

const MapDevice = (): JSX.Element => {
	const { socket } = useSocketStore();
	const divMapRef = useRef<HTMLDivElement>(null);

	const { currentPosition } = useCurrentPosition();
	const { setDevices } = useDeviceStore();
	const deviceVectorSource = useMemo(() => new VectorSource(), []);

	const { isDefined, mapRef } = useMap({
		containerRef: divMapRef,
		position: currentPosition,
		deviceVectorSource,
	});

	useDeviceMarkers(deviceVectorSource);

	useEffect(() => {
		if (!socket) {
			console.log("socket not defined");

			return;
		}

		const handleDevices = (data: Device[]) => {
			// console.log("change received of socket devices");
			setDevices(data);
		};

		const handleStates = () => {
			console.log(`states IS EXECUTED`);
		};

		socket.on("devices", handleDevices);
		socket.on("states", handleStates);

		return () => {
			socket.off("devices", handleDevices);
			socket.off("states", handleStates);
		};
	}, [socket, setDevices]);

	useEffect(() => {
		const map = mapRef.current;

		if (!isDefined || !map) {
			return;
		}

		const handleClick = (event: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) => {
			console.log(event);
			map.forEachFeatureAtPixel(event.pixel, (data) => {
				console.log(data);
			});
		};

		map.on("click", handleClick);

		return () => {
			map.un("click", handleClick);
		};
	}, [isDefined, mapRef]);

	return <div ref={divMapRef} className="w-full h-full z-40 relative" />;
};

export default MapDevice;
