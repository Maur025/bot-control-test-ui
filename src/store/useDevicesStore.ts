import { create } from "zustand";
import type { Device } from "../models/device-response";

interface DeviceStore {
	devices: Device[];
	setDevices: (devices: Device[]) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
	devices: [],
	setDevices: (devices) => {
		set({ devices: [...devices] });
	},
}));
