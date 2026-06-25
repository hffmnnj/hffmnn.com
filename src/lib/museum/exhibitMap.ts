import { projects, capyseoProjects } from '$lib/data/projects.js';
import type { RoomId } from './types.js';
import type { PanelContent } from './panel.js';

// Static content for non-project rooms
const ATRIUM_CONTENT: PanelContent = {
	roomId: 'atrium',
	title: 'The Museum of James',
	shortDescription:
		'A collection of work built with curiosity and craft. Walk through to explore each project — and look carefully for what you might find.',
	tags: [],
	detailUrl: null
};

// Map project slugs to their exhibit room IDs
const SLUG_TO_ROOM: Record<string, RoomId> = {
	'enclave-mail': 'vault',
	'opencode-goopspec': 'protocol',
	vibearchy: 'hacker',
	'me-and-my-friends': 'council',
	'nano-banana-cli': 'lab'
};

function buildExhibitMap(): Map<RoomId, PanelContent> {
	const map = new Map<RoomId, PanelContent>();

	map.set('atrium', ATRIUM_CONTENT);

	for (const project of projects) {
		const roomId = SLUG_TO_ROOM[project.slug];
		if (!roomId) continue;

		map.set(roomId, {
			roomId,
			title: project.title,
			shortDescription: project.shortDescription,
			tags: project.tags.slice(0, 5),
			detailUrl: `/tools/${project.slug}`
		});
	}

	// Archive: CapySEO core as representative of the suite
	const capyseoCore = capyseoProjects.find((p) => p.slug === 'capyseo-core');
	if (capyseoCore) {
		map.set('archive', {
			roomId: 'archive',
			title: 'CapySEO Suite',
			shortDescription: capyseoCore.shortDescription,
			tags: capyseoCore.tags.slice(0, 5),
			detailUrl: `/tools/capyseo-core`
		});
	}

	return map;
}

export const EXHIBIT_MAP = buildExhibitMap();
