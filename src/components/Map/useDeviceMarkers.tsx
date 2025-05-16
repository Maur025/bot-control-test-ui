import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, type RefObject } from "react";
import type { DeviceCurrentLocation } from "../../models/device-current-location";
import { Geometry, Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import { SocketTopic } from "../../socket-topic";
import { useSocketStore } from "../../store/useSocketStore";
import { SocketRoom } from "../../socket-room";
import type { SingleIoResponse } from "@maur025/core-model-data";
import { useSocketRoomHandler } from "../../hooks/useSocketRoomHandler";

interface DeviceMarkersResponse {
	deviceFeatureRef: RefObject<Map<string, Feature>>;
}

const { DEVICE_LOCATION_LAST } = SocketTopic;
const { MONITOR_ALL_DEVICES } = SocketRoom;

export const useDeviceMarkers = (deviceVectorSource: VectorSource): DeviceMarkersResponse => {
	const deviceFeatureRef = useRef<Map<string, Feature>>(new Map());
	const { socket } = useSocketStore();
	const { joinRoom, leaveRoom } = useSocketRoomHandler();

	useEffect(() => {
		if (!socket) {
			return;
		}

		joinRoom(MONITOR_ALL_DEVICES);

		const deviceLastPositionHandler = ({ data }: SingleIoResponse<DeviceCurrentLocation>) => {
			if (!data?.id || !deviceVectorSource) {
				return;
			}

			const {
				id: deviceId,
				last: { lat = 0, lon = 0 },
			} = data;

			let feature = deviceFeatureRef.current.get(deviceId);

			if (!feature) {
				feature = new Feature({
					geometry: new Point(fromLonLat([lon, lat])),
				});

				feature.setStyle(new Style({ image: new Icon({ src: "/navigation-3.webp" }) }));

				deviceVectorSource.addFeature(feature);
				deviceFeatureRef.current.set(deviceId, feature);
			} else {
				const geometry: Geometry | undefined = feature.getGeometry();

				if (geometry instanceof Point) {
					geometry.setCoordinates(fromLonLat([lon, lat]));
				}
			}
		};

		socket.on(DEVICE_LOCATION_LAST, (payload: SingleIoResponse<DeviceCurrentLocation>) =>
			deviceLastPositionHandler(payload),
		);

		return () => {
			leaveRoom(MONITOR_ALL_DEVICES);
			socket.off(DEVICE_LOCATION_LAST, deviceLastPositionHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket, deviceVectorSource]);

	return { deviceFeatureRef };
};
