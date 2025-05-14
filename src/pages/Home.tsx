import type { JSX } from "react";
import MapDevice from "../components/Map/MapDevice";

const Home = (): JSX.Element => {
	return (
		<section className="w-full px-8 py-6 m-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
			<MapDevice />
		</section>
	);
};

export default Home;
