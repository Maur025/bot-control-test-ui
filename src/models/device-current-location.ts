import type { BaseData } from "@maur025/core-model-data";
import type DeviceTrack from "./device-track";

export interface DeviceCurrentLocation extends BaseData {
	last: DeviceTrack;
}
