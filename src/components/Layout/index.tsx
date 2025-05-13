import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import type { JSX } from "react";
import { Outlet } from "react-router";

const Layout = (): JSX.Element => {
	return (
		<div className="flex h-screen">
			<Navbar />
			<Sidebar />
			<main className="flex overflow-y-auto bg-gray-100 text-black dark:bg-gray-900 dark:text-white min-h-screen w-full">
				<Outlet />

				<Footer />
			</main>
		</div>
	);
};

export default Layout;
