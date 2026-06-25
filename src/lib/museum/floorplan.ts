import type { RoomId } from './types.js';

export interface RoomDef {
	id: RoomId;
	label: string;
	center: [number, number, number]; // XYZ world position of room center
	size: [number, number, number]; // width (X), height (Y), depth (Z)
	exhibitPosition: [number, number, number];
	playerSpawn: [number, number, number];
}

export interface CorridorDef {
	from: RoomId;
	to: RoomId;
	center: [number, number, number];
	size: [number, number, number]; // width, height, depth
}

export const PLAYER_HEIGHT = 1.7;
export const PLAYER_RADIUS = 0.3;

export const ROOMS: RoomDef[] = [
	{
		id: 'atrium',
		label: 'Entrance Atrium',
		center: [0, 0, 0],
		size: [16, 8, 16],
		exhibitPosition: [0, 0, -4],
		playerSpawn: [0, PLAYER_HEIGHT, 4]
	},
	{
		id: 'vault',
		label: 'The Vault',
		center: [-20, 0, -8],
		size: [12, 8, 14],
		exhibitPosition: [-20, 0, -12],
		playerSpawn: [-20, PLAYER_HEIGHT, -3]
	},
	{
		id: 'protocol',
		label: 'The Protocol Chamber',
		center: [0, 0, -22],
		size: [14, 10, 14],
		exhibitPosition: [0, 0, -26],
		playerSpawn: [0, PLAYER_HEIGHT, -17]
	},
	{
		id: 'hacker',
		label: "The Hacker's Atrium",
		center: [20, 0, -8],
		size: [12, 8, 14],
		exhibitPosition: [20, 0, -12],
		playerSpawn: [20, PLAYER_HEIGHT, -3]
	},
	{
		id: 'council',
		label: 'The Council Hall',
		center: [-20, 0, -28],
		size: [14, 9, 14],
		exhibitPosition: [-20, 0, -32],
		playerSpawn: [-20, PLAYER_HEIGHT, -23]
	},
	{
		id: 'lab',
		label: 'The Lab',
		center: [20, 0, -28],
		size: [12, 8, 14],
		exhibitPosition: [20, 0, -32],
		playerSpawn: [20, PLAYER_HEIGHT, -23]
	},
	{
		id: 'archive',
		label: 'The Archive',
		center: [0, 0, -44],
		size: [14, 8, 12],
		exhibitPosition: [0, 0, -48],
		playerSpawn: [0, PLAYER_HEIGHT, -39]
	},
	{
		id: 'hidden-wing',
		label: 'The Hidden Wing',
		center: [0, 0, -62],
		size: [12, 8, 12],
		exhibitPosition: [0, 0, -66],
		playerSpawn: [0, PLAYER_HEIGHT, -57]
	}
];

export const CORRIDORS: CorridorDef[] = [
	{ from: 'atrium', to: 'vault', center: [-10, 0, -5], size: [4, 7, 8] },
	{ from: 'atrium', to: 'protocol', center: [0, 0, -11], size: [4, 8, 6] },
	{ from: 'atrium', to: 'hacker', center: [10, 0, -5], size: [4, 7, 8] },
	{ from: 'vault', to: 'council', center: [-20, 0, -19], size: [4, 8, 8] },
	{ from: 'protocol', to: 'archive', center: [0, 0, -33], size: [4, 8, 6] },
	{ from: 'hacker', to: 'lab', center: [20, 0, -19], size: [4, 7, 8] },
	{ from: 'archive', to: 'hidden-wing', center: [0, 0, -52], size: [4, 8, 4] },
	{ from: 'council', to: 'archive', center: [-10, 0, -40], size: [4, 8, 4] },
	{ from: 'lab', to: 'archive', center: [10, 0, -40], size: [4, 8, 4] }
];

export function getRoomById(id: RoomId): RoomDef | undefined {
	return ROOMS.find((room) => room.id === id);
}
