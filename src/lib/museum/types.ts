// Room IDs — one per museum room
export type RoomId =
	| 'atrium'
	| 'vault'
	| 'protocol'
	| 'hacker'
	| 'council'
	| 'lab'
	| 'archive'
	| 'hidden-wing';

// A project exhibit definition, linking a room to project data
export interface ExhibitDef {
	roomId: RoomId;
	projectSlug: string | null; // null for non-project rooms (atrium, hidden-wing)
	detailUrl: string | null;
	dropsKey: boolean; // true for the 5 main exhibits (vault, protocol, hacker, council, lab)
}

// Global museum state managed as Svelte reactive state
export interface MuseumState {
	currentRoom: RoomId;
	activeExhibitId: RoomId | null;
	isPointerLocked: boolean;
	isLoading: boolean;
	loadingProgress: number; // 0-100
}
