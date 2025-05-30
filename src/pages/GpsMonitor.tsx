import type { JSX } from "react";
import MapGps from "../components/Map/MapGps";

const GpsMonitor = (): JSX.Element => {
	return (
		<section className="w-full px-8 py-6 m-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
			<MapGps />
		</section>
	);
};

export default GpsMonitor;
