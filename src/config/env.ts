import type { Environment } from "../models/environment";

const metaEnvs = import.meta.env;

const {
	VITE_SOCKET_URL = "http://localhost:6983",
	VITE_API_URL = "http://localhost:6983",
	VITE_SOCKET_GPS = "http://localhost:7767",
} = metaEnvs;

export const env: Environment = {
	VITE_SOCKET_URL,
	VITE_API_URL,
	VITE_SOCKET_GPS,
};
