import type { JSX } from "react";
import { useEffect, useRef } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { useCurrentPosition } from "./useCurrentPosition";
import { Point } from "ol/geom";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { useSocketStore } from "../../store/useSocketStore";
import { SocketTopic } from "../../socket-topic";

const { DEVICE_LAST } = SocketTopic;

const Map = (): JSX.Element => {
	const divMapRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<OlMap>(null);
	const viewRef = useRef<View>(null);
	const positionFeatureRef = useRef<Feature>(null);
	const vectorSourceRef = useRef<VectorSource>(null);

	const { currentPosition } = useCurrentPosition();
	const { socket } = useSocketStore();

	useEffect(() => {
		if (!currentPosition) {
			return;
		}

		if (!divMapRef.current) {
			return;
		}

		positionFeatureRef.current = new Feature({
			geometry: new Point(fromLonLat(currentPosition)),
		});

		vectorSourceRef.current = new VectorSource({
			features: [positionFeatureRef.current],
		});

		viewRef.current = new View({
			center: fromLonLat(currentPosition),
			zoom: 16,
		});

		mapRef.current = new OlMap({
			target: divMapRef.current,
			layers: [
				new TileLayer({ source: new OSM() }),
				new VectorLayer({ source: vectorSourceRef.current }),
			],
			view: viewRef.current,
		});

		positionFeatureRef.current.setStyle(
			new Style({
				image: new CircleStyle({
					radius: 8,
					fill: new Fill({ color: "#2980b9" }),
					stroke: new Stroke({ color: "#7fb3d5", width: 3 }),
				}),
			}),
		);

		return () => mapRef.current?.setTarget(undefined);
	}, [currentPosition]);

	useEffect(() => {
		if (!socket) {
			return;
		}

		console.log(socket);

		socket.on(DEVICE_LAST, (payload) => {
			console.log(payload);
		});

		return () => {
			socket.off(DEVICE_LAST);
		};
	}, [socket]);

	return <div ref={divMapRef} className="w-full h-full z-50"></div>;
};

export default Map;
