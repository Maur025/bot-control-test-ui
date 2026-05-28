import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, type RefObject } from "react";
import { Geometry, LineString, Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Stroke, Style } from "ol/style";
import type { Coordinate } from "ol/coordinate";
import { useDeviceStore } from "../../store/useDevicesStore";

interface DeviceMarkersResponse {
	deviceFeatureRef: RefObject<Map<string, Feature>>;
}

const LINE_STYLE = new Style({
	stroke: new Stroke({
		color: "orange",
		width: 4,
	}),
});

export const useDeviceMarkers = (deviceVectorSource: VectorSource): DeviceMarkersResponse => {
	const deviceFeatureRef = useRef<Map<string, Feature>>(new Map());
	const lineMovementRef = useRef<Map<string, Feature<LineString>>>(new Map());
	const movementHistoryRef = useRef<Map<string, Coordinate[]>>(new Map());
	const { devices } = useDeviceStore();

	useEffect(() => {
		if (!devices || !deviceVectorSource) {
			return;
		}

		const getAngleByCoords = ([x1, y1]: Coordinate, [x2, y2]: Coordinate) => {
			const differenceInX = x2 - x1;
			const differenceInY = y2 - y1;

			let angleInRadians = Math.atan2(-differenceInY, differenceInX); // ajuste por canvas --- eje y invertido

			if (angleInRadians < 0) {
				angleInRadians = angleInRadians + Math.PI * 2;
			}

			return angleInRadians;
		};

		const handleFeatureNotExists = (deviceId: string, coords: Coordinate): Feature => {
			const feature = new Feature({
				geometry: new Point(coords),
			});
			feature.setProperties({ id: deviceId });

			const routeLine = new Feature({
				geometry: new LineString([]),
			});
			routeLine.setStyle(LINE_STYLE);

			deviceFeatureRef.current.set(deviceId, feature);
			lineMovementRef.current.set(deviceId, routeLine);
			movementHistoryRef.current.set(deviceId, [coords]);

			deviceVectorSource.addFeature(feature);
			deviceVectorSource.addFeature(routeLine);

			return feature;
		};

		for (const device of devices) {
			if (!device.id) {
				continue;
			}

			const {
				id: deviceId,
				last: { lat = 0, lon = 0 },
			} = device;

			const coords: Coordinate = fromLonLat([lon, lat]);

			let feature = deviceFeatureRef.current.get(deviceId);

			if (!feature) {
				feature = handleFeatureNotExists(deviceId, coords);
			} else {
				const geometry: Geometry | undefined = feature.getGeometry();

				if (geometry instanceof Point) {
					geometry.setCoordinates(coords);
				}

				const lineFeature = lineMovementRef.current?.get(deviceId);
				let lineHistory = movementHistoryRef.current?.get(deviceId) ?? [];

				if (lineHistory.length > 0) {
					const lastCoord = lineHistory[lineHistory.length - 1];

					if (lastCoord[0] !== coords[0] && lastCoord[1] !== coords[1]) {
						const rotation = getAngleByCoords(lastCoord, coords);

						feature.setProperties({ rotation: rotation });

						lineHistory = [...lineHistory.slice(-30), coords];

						const lineGeometry = lineFeature?.getGeometry();

						if (lineGeometry instanceof LineString) {
							lineGeometry.setCoordinates(lineHistory);
						}

						movementHistoryRef.current.set(deviceId, lineHistory);
					}
				} else {
					lineHistory.push(coords);
					movementHistoryRef.current.set(deviceId, lineHistory);
				}
			}
		}

		return () => {};
	}, [deviceVectorSource, devices]);

	return { deviceFeatureRef };
};
