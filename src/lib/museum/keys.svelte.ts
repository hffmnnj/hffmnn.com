import { browser } from '$app/environment';
import type { RoomId } from './types.js';

const STORAGE_KEY = 'museum_keys';
const KEY_DROPS: Set<RoomId> = new Set(['vault', 'protocol', 'hacker', 'council', 'lab']);

function readKeys(): RoomId[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? (JSON.parse(raw) as unknown[]) : [];
		return parsed.filter((k): k is RoomId => typeof k === 'string' && KEY_DROPS.has(k as RoomId));
	} catch {
		return [];
	}
}

let _keys = $state<RoomId[]>(readKeys());

$effect.root(() => {
	$effect(() => {
		if (browser) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(_keys));
		}
	});
});

export function getKeys(): RoomId[] {
	return _keys;
}

export function hasKey(roomId: RoomId): boolean {
	return _keys.includes(roomId);
}

export function collectKey(roomId: RoomId): boolean {
	if (!KEY_DROPS.has(roomId)) return false;
	if (_keys.includes(roomId)) return false;
	_keys = [..._keys, roomId];
	return true;
}

export function hasAllKeys(): boolean {
	return KEY_DROPS.size > 0 && [...KEY_DROPS].every((k) => _keys.includes(k));
}

export function getKeyCount(): number {
	return _keys.length;
}

export function resetKeys(): void {
	_keys = [];
	if (browser) localStorage.removeItem(STORAGE_KEY);
}
