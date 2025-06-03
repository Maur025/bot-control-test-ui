import type { JSX } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCurrentPosition } from "./useCurrentPosition";
import { useMap } from "./useMap";
import { useDeviceMarkers } from "./useDeviceMarkers";
import VectorSource from "ol/source/Vector";
import { useSocketStore } from "../../store/useSocketStore";
import { SocketTopic } from "../../socket-topic";
import type { MapBrowserEvent } from "ol";

const {
	BOT_IS_RUNNING,
	BOT_GET_IS_RUNNING,
	BOT_REQ_START,
	BOT_REQ_START_RESPONSE,
	BOT_REQ_STOP,
	BOT_REQ_STOP_RESPONSE,
} = SocketTopic;

const MapDevice = (): JSX.Element => {
	const { socket } = useSocketStore();
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const divMapRef = useRef<HTMLDivElement>(null);

	const { currentPosition } = useCurrentPosition();
	const deviceVectorSource = useMemo(() => new VectorSource(), []);

	const { isDefined, mapRef } = useMap({
		containerRef: divMapRef,
		position: currentPosition,
		deviceVectorSource,
	});

	useDeviceMarkers(deviceVectorSource);

	const onClickStart = () => {
		setIsLoading(true);

		if (socket) {
			socket.emit(BOT_REQ_START);
		}
	};

	const onClickStop = () => {
		setIsLoading(true);

		if (socket) {
			socket.emit(BOT_REQ_STOP);
		}
	};

	useEffect(() => {
		if (!socket) {
			return;
		}

		socket.emit(BOT_GET_IS_RUNNING);

		socket.on(BOT_IS_RUNNING, (payload) => {
			setIsRunning(payload);
		});

		socket.on(BOT_REQ_START_RESPONSE, () => {
			setIsRunning(true);
			setIsLoading(false);
		});

		socket.on(BOT_REQ_STOP_RESPONSE, () => {
			setIsRunning(false);
			setIsLoading(false);
		});

		return () => {
			socket.off(BOT_IS_RUNNING);
			socket.off(BOT_REQ_START_RESPONSE);
			socket.off(BOT_REQ_STOP_RESPONSE);
		};
	}, [socket]);

	useEffect(() => {
		const map = mapRef.current;

		if (!isDefined || !map) {
			return;
		}

		const handleClick = (event: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) => {
			console.log(event);
			map.forEachFeatureAtPixel(event.pixel, (data) => {
				console.log(data);
			});
		};

		map.on("click", handleClick);

		return () => {
			map.un("click", handleClick);
		};
	}, [isDefined, mapRef]);

	return (
		<div ref={divMapRef} className="w-full h-full z-40 relative">
			<div className="absolute h-20 lg:w-auto xl:w-1/3 bg-gray-800 z-50 bottom-5 xl:left-1/3 lg:left-0 rounded-lg">
				<button
					className={
						isRunning
							? "dark:bg-gray-600 dark:text-gray-200 py-2 px-8 my-4 ms-8 me-2 disabled:cursor-not-allowed"
							: "dark:bg-blue-400 dark:text-gray-800 py-2 px-8 my-4 ms-8 me-2 cursor-pointer"
					}
					onClick={() => onClickStart()}
					disabled={isRunning || isLoading}
				>
					{!isRunning && isLoading ? "PROCESANDO..." : "INICIAR"}
				</button>
				<button
					className={
						isRunning
							? "dark:bg-blue-400 dark:text-gray-800 py-2 px-8 my-4 ms-2 me-8 cursor-pointer"
							: "dark:bg-gray-600 dark:text-gray-200 py-2 px-8 my-4 ms-2 me-8 disabled:cursor-not-allowed"
					}
					onClick={() => onClickStop()}
					disabled={!isRunning || isLoading}
				>
					{isRunning && isLoading ? "PROCESANDO..." : "DETENER"}
				</button>
			</div>
		</div>
	);
};

export default MapDevice;
