import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
	return (
		<div className="flex h-screen">
			<Navbar />
			<Sidebar />
			<main className="flex-1 overflow-y-auto">
				<Outlet />

				<Footer />
			</main>
		</div>
	);
};

export default Layout;
