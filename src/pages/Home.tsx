import { useTheme } from "../context/theme/useTheme";

const Home = () => {
	const { theme } = useTheme();

	return (
		<div>
			<h1>Welcome to Home page</h1>
			<p>Current theme equal to: {theme}</p>
		</div>
	);
};

export default Home;
