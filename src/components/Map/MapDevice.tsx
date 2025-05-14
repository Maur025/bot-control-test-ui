import type { JSX } from "react";
import { useMemo, useRef } from "react";
import { useCurrentPosition } from "./useCurrentPosition";
import { useMap } from "./useMap";
import { useDeviceMarkers } from "./useDeviceMarkers";
import VectorSource from "ol/source/Vector";

const MapDevice = (): JSX.Element => {
	const divMapRef = useRef<HTMLDivElement>(null);

	const { currentPosition } = useCurrentPosition();
	const deviceVectorSource = useMemo(() => new VectorSource(), []);

	useMap({ containerRef: divMapRef, position: currentPosition, deviceVectorSource });

	useDeviceMarkers(deviceVectorSource);

	return <div ref={divMapRef} className="w-full h-full z-50"></div>;
};

export default MapDevice;
