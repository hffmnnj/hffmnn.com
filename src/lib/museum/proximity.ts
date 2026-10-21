import type * as Three from 'three';
import type { RoomId } from './types.js';
import type { Exhibit } from './exhibits/index.js';

// Radius within which an exhibit activates (in world units)
export const ACTIVATION_RADIUS = 5.0;

export interface ProximitySystem {
	// Called each frame; updates activeExhibit based on camera position
	update: (camera: Three.PerspectiveCamera) => void;
	// Currently active exhibit room ID (null if none in range)
	getActiveExhibitId: () => RoomId | null;
	// Register a callback for when activation state changes
	onActivationChange: (
		callback: (exhibitId: RoomId | null, wasActive: boolean) => void
	) => () => void; // returns unsubscribe fn
}

export function createProximitySystem(
	exhibits: Map<RoomId, Exhibit>,
	exhibitPositions: Map<RoomId, Three.Vector3>
): ProximitySystem {
	let activeExhibitId: RoomId | null = null;
	const callbacks = new Set<(id: RoomId | null, wasActive: boolean) => void>();

	function update(camera: Three.PerspectiveCamera): void {
		const camPos = camera.position;
		let nearest: RoomId | null = null;
		let nearestDist = Infinity;

		for (const [roomId, pos] of exhibitPositions) {
			const dx = camPos.x - pos.x;
			const dz = camPos.z - pos.z;
			const dist = Math.sqrt(dx * dx + dz * dz);
			if (dist < ACTIVATION_RADIUS && dist < nearestDist) {
				nearest = roomId;
				nearestDist = dist;
			}
		}

		if (nearest !== activeExhibitId) {
			const prev = activeExhibitId;
			activeExhibitId = nearest;
			for (const cb of callbacks) {
				cb(nearest, prev !== null);
			}
		}

		for (const [roomId, exhibit] of exhibits) {
			const isActive = roomId === activeExhibitId;
			exhibit.group.userData['isActive'] = isActive;
		}
	}

	function getActiveExhibitId(): RoomId | null {
		return activeExhibitId;
	}

	function onActivationChange(
		callback: (id: RoomId | null, wasActive: boolean) => void
	): () => void {
		callbacks.add(callback);
		return () => callbacks.delete(callback);
	}

	return { update, getActiveExhibitId, onActivationChange };
}
