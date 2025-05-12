import type { Coordinate } from "ol/coordinate";
import { useEffect, useState } from "react";

const TEST_COORDS: Coordinate = [-68.0685141, -16.5302401];

interface Response {
	currentPosition: Coordinate;
	getCurrentPosition: () => void;
}

export const useCurrentPosition = (): Response => {
	const [currentPosition, setCurrentPosition] = useState<Coordinate>(TEST_COORDS);

	const getCurrentPosition = () => {
		if (!navigator.geolocation) {
			return;
		}

		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => setCurrentPosition([longitude, latitude]),
			(error) => {
				console.error("Error can't get location: ", error);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0,
			},
		);
	};

	useEffect(() => {
		getCurrentPosition();
	}, []);

	return { currentPosition, getCurrentPosition };
};
