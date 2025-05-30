import { useMemo, useRef, type JSX } from "react";
import { useCurrentPosition } from "./useCurrentPosition";
import VectorSource from "ol/source/Vector";
import { useMap } from "./useMap";

const MapGps = (): JSX.Element => {
	const elementMapRef = useRef<HTMLDivElement>(null);

	const { currentPosition } = useCurrentPosition();
	const gpsVectorSource = useMemo(() => new VectorSource(), []);

	useMap({
		containerRef: elementMapRef,
		position: currentPosition,
		deviceVectorSource: gpsVectorSource,
	});

	return <div ref={elementMapRef} className="w-full h-full z-50" />;
};

export default MapGps;
