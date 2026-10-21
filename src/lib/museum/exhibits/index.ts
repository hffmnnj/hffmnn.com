import type * as Three from 'three';
import type { RoomId } from '../types.js';

export interface Exhibit {
	id: RoomId;
	group: import('three').Group;
	// Called each frame with elapsed time (for Wave 3 breathing + Wave 5 atmosphere)
	tick: (t: number, active: boolean) => void;
}

export async function createAllExhibits(
	THREE: typeof import('three'),
	scene: import('three').Scene
): Promise<Map<RoomId, Exhibit>> {
	const { ROOMS } = await import('../floorplan.js');
	const exhibits = new Map<RoomId, Exhibit>();

	const factories = await Promise.all([
		import('./atrium.js'),
		import('./vault.js'),
		import('./protocol.js'),
		import('./hacker.js'),
		import('./council.js'),
		import('./lab.js'),
		import('./archive.js')
	]);

	const roomsForExhibits: RoomId[] = ['atrium', 'vault', 'protocol', 'hacker', 'council', 'lab', 'archive'];

	for (let i = 0; i < factories.length; i += 1) {
		const roomId = roomsForExhibits[i];
		const room = ROOMS.find((r) => r.id === roomId)!;
		const exhibit = await factories[i].createExhibit(THREE, room.exhibitPosition);
		exhibit.group.position.set(...room.exhibitPosition);
		scene.add(exhibit.group);
		exhibits.set(roomId, exhibit);
	}

	return exhibits;
}
