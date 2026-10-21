import { ROOMS, CORRIDORS, PLAYER_RADIUS } from './floorplan.js';
import type { RoomId } from './types.js';
import type * as Three from 'three';

interface Bounds {
	minX: number;
	maxX: number;
	minZ: number;
	maxZ: number;
}

function roomToBounds(
	center: [number, number, number],
	size: [number, number, number],
	shrink: number
): Bounds {
	return {
		minX: center[0] - size[0] / 2 + shrink,
		maxX: center[0] + size[0] / 2 - shrink,
		minZ: center[2] - size[2] / 2 + shrink,
		maxZ: center[2] + size[2] / 2 - shrink
	};
}

// All walkable AABB regions (rooms + corridors), shrunk by player radius
const WALKABLE_REGIONS: Bounds[] = [
	...ROOMS.map((r) => roomToBounds(r.center, r.size, PLAYER_RADIUS + 0.3)),
	...CORRIDORS.map((c) => roomToBounds(c.center, c.size, PLAYER_RADIUS + 0.2))
];

function isInsideAny(x: number, z: number): boolean {
	return WALKABLE_REGIONS.some(
		(b) => x >= b.minX && x <= b.maxX && z >= b.minZ && z <= b.maxZ
	);
}

/**
 * Clamp the camera/player position to walkable space.
 * Call this each frame after movement is applied.
 */
export function applyCollision(
	camera: Three.PerspectiveCamera,
	prevX: number,
	prevZ: number
): void {
	const newX = camera.position.x;
	const newZ = camera.position.z;

	const okX = isInsideAny(newX, prevZ);
	const okZ = isInsideAny(prevX, newZ);
	const okBoth = isInsideAny(newX, newZ);

	if (okBoth) return; // no collision

	// Try sliding along X or Z axis
	if (okX) {
		camera.position.z = prevZ;
	} else if (okZ) {
		camera.position.x = prevX;
	} else {
		// Full revert
		camera.position.x = prevX;
		camera.position.z = prevZ;
	}
}

/**
 * Determine which room the player is currently in (by center proximity).
 * Returns null if between rooms (corridor).
 */
export function getCurrentRoom(x: number, z: number): RoomId | null {
	for (const room of ROOMS) {
		const b = roomToBounds(room.center, room.size, 0);
		if (x >= b.minX && x <= b.maxX && z >= b.minZ && z <= b.maxZ) {
			return room.id;
		}
	}
	return null;
}
