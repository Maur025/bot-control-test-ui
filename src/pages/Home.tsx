import type { JSX } from "react";
import Map from "../components/Map";

const Home = (): JSX.Element => {
	return (
		<section className="w-full px-8 py-6 m-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
			<Map />
		</section>
	);
};

export default Home;
