import type { JSX } from "react";
import { useTheme } from "../../context/theme/useTheme";
import BotDevices from "./BotDevices";
import { NavLink } from "react-router";

const COMMON_ITEM_STYLE: string = "p-1.5 transition-colors duration-200 rounded-lg";

const Sidebar = (): JSX.Element => {
	const { theme, toggleTheme } = useTheme();

	return (
		<aside className="flex flex-1">
			<div className="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
				<NavLink
					to="/"
					end
					className={({ isActive }: { isActive: boolean }) =>
						`${
							isActive
								? "text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-gray-800"
								: "focus:outline-nones text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
						} ${COMMON_ITEM_STYLE}`
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
				</NavLink>

				<NavLink
					to="bot"
					end
					className={({ isActive }: { isActive: boolean }) =>
						`${
							isActive
								? "text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-gray-800"
								: "focus:outline-nones text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
						} ${COMMON_ITEM_STYLE}`
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
						/>
					</svg>
				</NavLink>

				<NavLink
					to="/graphics"
					end
					className={({ isActive }: { isActive: boolean }) =>
						`${
							isActive
								? "text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-gray-800"
								: "focus:outline-nones text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
						} ${COMMON_ITEM_STYLE}`
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
						/>
					</svg>
				</NavLink>

				<NavLink
					to="notifications"
					end
					className={({ isActive }: { isActive: boolean }) =>
						`${
							isActive
								? "text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-gray-800"
								: "focus:outline-nones text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
						} ${COMMON_ITEM_STYLE}`
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</NavLink>

				<NavLink
					to="settings"
					end
					className={({ isActive }: { isActive: boolean }) =>
						`${
							isActive
								? "text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-gray-800"
								: "focus:outline-nones text-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
						} ${COMMON_ITEM_STYLE}`
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</NavLink>

				<button
					className="py-1.5 px-1.5 text-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 focus:outline-hidden"
					aria-label="darkMode mode button"
					onClick={toggleTheme}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-5 h-5 sm:w-6 sm:h-6"
					>
						{theme === "light" ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
							></path>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							></path>
						)}
					</svg>
				</button>
			</div>

			<BotDevices />
		</aside>
	);
};

export default Sidebar;
