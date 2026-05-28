import type { JSX } from "react";
import { useDeviceStore } from "../../store/useDevicesStore";

const BotDevices = (): JSX.Element => {
	const { devices } = useDeviceStore();

	return (
		<div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-400">
			<h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">
				Bot Device(s)
			</h2>

			<div className="mt-8 space-y-4">
				{devices?.length > 0 &&
					devices.map((device) => (
						<button
							key={device.id}
							className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none"
						>
							<div className="text-left rtl:text-right">
								<h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
									Device: {device.id ?? "N/A"}
								</h1>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									Imei: {device.config.IMEI ?? "N/A"}
									<br />
									Device type: {device.type}
									<br />
									Name: {device.spec?.name}
								</p>

								<p className="text-xs text-gray-500 dark:text-gray-400">
									Track quantity: {device.tracks}
									<br />
									Last:{" "}
									{device.last?.t
										? new Date(device.last.t).toLocaleString()
										: "N/A"}
								</p>
							</div>
						</button>
					))}
			</div>
		</div>
	);
};

export default BotDevices;
