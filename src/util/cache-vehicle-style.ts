import { Icon, Style } from "ol/style";

const vehicleStyleCache: Record<string, Style> = {};

export const getCachedVehicleStyle = (rotation: number) => {
	const key = rotation.toFixed(2);

	if (vehicleStyleCache[key]) {
		return vehicleStyleCache[key];
	}

	const newStyle = new Style({
		image: new Icon({
			src: "/navigation-3.webp",
			scale: 0.5,
			rotation: rotation,
		}),
	});

	vehicleStyleCache[key] = newStyle;

	return newStyle;
};
