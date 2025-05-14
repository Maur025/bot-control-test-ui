import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef } from "react";
import type { DeviceCurrentLocation } from "../../models/device-current-location";
import { Geometry, Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import { SocketTopic } from "../../socket-topic";
import { useSocketStore } from "../../store/useSocketStore";

const { DEVICE_LAST } = SocketTopic;

export const useDeviceMarkers = (deviceVectorSource: VectorSource) => {
	const deviceFeatureRef = useRef<Map<string, Feature>>(new Map());
	const { socket } = useSocketStore();

	useEffect(() => {
		if (!socket) {
			return;
		}

		const deviceLastPositionHandler = ({
			id: deviceId,
			last: { lat = 0, lon = 0 },
		}: DeviceCurrentLocation) => {
			console.log("esta aqui");

			if (!deviceId) {
				return;
			}

			let feature = deviceFeatureRef.current.get(deviceId);

			if (!feature) {
				feature = new Feature({
					geometry: new Point(fromLonLat([lon, lat])),
				});

				feature.setStyle(new Style({ image: new Icon({ src: "/marker-3.png" }) }));

				deviceVectorSource.addFeature(feature);
				deviceFeatureRef.current.set(deviceId, feature);
			} else {
				const geometry: Geometry | undefined = feature.getGeometry();

				if (geometry instanceof Point) {
					geometry.setCoordinates(fromLonLat([lon, lat]));
				} else {
					console.log("no existe o no es un punto");
				}
			}
		};

		socket.on(DEVICE_LAST, deviceLastPositionHandler);

		return () => {
			socket.off(DEVICE_LAST, deviceLastPositionHandler);
		};
	}, [socket, deviceVectorSource]);
};
