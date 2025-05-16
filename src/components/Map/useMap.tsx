import { Feature, Map, View } from "ol";
import type { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { useEffect, useRef, type RefObject } from "react";

interface MapRequest {
	containerRef: RefObject<HTMLDivElement | null>;
	position: Coordinate;
	deviceVectorSource: VectorSource;
}

interface MapResponse {
	mapRef: RefObject<Map | null>;
	vectorSourceRef: RefObject<VectorSource | null>;
	positionFeatureRef: RefObject<Feature | null>;
}

export const useMap = ({ containerRef, position, deviceVectorSource }: MapRequest): MapResponse => {
	const positionFeatureRef = useRef<Feature>(null);
	const vectorSourceRef = useRef<VectorSource>(null);
	const viewRef = useRef<View>(null);
	const mapRef = useRef<Map>(null);

	useEffect(() => {
		if (!containerRef.current || !position || !deviceVectorSource) {
			return;
		}

		positionFeatureRef.current = new Feature({
			geometry: new Point(fromLonLat(position)),
		});

		vectorSourceRef.current = new VectorSource({
			features: [positionFeatureRef.current],
		});

		viewRef.current = new View({
			center: fromLonLat(position),
			zoom: 16,
		});

		mapRef.current = new Map({
			target: containerRef.current,
			layers: [
				new TileLayer({ source: new OSM() }),
				new VectorLayer({ source: vectorSourceRef.current }),
				new VectorLayer({ source: deviceVectorSource }),
			],
			view: viewRef.current,
		});

		positionFeatureRef.current.setStyle(
			new Style({
				image: new Icon({ src: "/marker-3.png" }),
			}),
		);

		return () => mapRef.current?.setTarget(undefined);
	}, [containerRef, position, deviceVectorSource]);

	return { mapRef, vectorSourceRef, positionFeatureRef };
};
