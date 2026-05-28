export interface Device {
	id: string;
	spec: Spec;
	config: Config;
	type: string;
	elapsed: number;
	setup: Setup;
	states: States;
	tracks: number;
	statesRecords: number;
	last: Last;
}

interface Config {
	IMEI: string;
}

interface Last {
	t: number;
	lat: number;
	lon: number;
	bat: number;
	acc: number;
	stp: number;
}

interface Setup {
	test: string;
}

interface Spec {
	name: string;
	brand: string;
	model: string;
	type: string;
}

interface States {
	SORTED: boolean;
	ACCURACY: number;
	SPEED: number;
	DIRECTION: number;
	IGNITION: number;
	VEHICLE_THEFT: string;
	SIGNAL: string;
	BATTERY_EXTERNAL: string;
	DISARMED: string;
	SLEEP: string;
	SENSOR_4: string;
	SENSOR_5: string;
}
