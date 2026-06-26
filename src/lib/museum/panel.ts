// panel.ts — builds CSS2D exhibit info panels
import type * as Three from 'three';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import type { RoomId } from './types.js';

export interface PanelContent {
	roomId: RoomId;
	title: string;
	shortDescription: string;
	tags: string[];
	detailUrl: string | null;
}

export interface PanelObject {
	object: CSS2DObject;
	setVisible: (visible: boolean) => void;
	dispose: () => void;
}

export async function createPanel(
	_THREE: typeof import('three'),
	content: PanelContent,
	attachPosition: Three.Vector3,
	scene: Three.Scene
): Promise<PanelObject> {
	const { CSS2DObject } = await import(
		'three/examples/jsm/renderers/CSS2DRenderer.js'
	);

	// Create the DOM panel element
	const panel = document.createElement('div');
	panel.className = 'exhibit-panel';
	panel.setAttribute('role', 'group');
	panel.setAttribute('aria-label', `Exhibit: ${content.title}`);
	panel.innerHTML = `
		<div class="exhibit-panel__inner">
			<h2 class="exhibit-panel__title">${escapeHtml(content.title)}</h2>
			${
				content.shortDescription
					? `<p class="exhibit-panel__desc">${escapeHtml(content.shortDescription)}</p>`
					: ''
			}
			${
				content.tags.length > 0
					? `<div class="exhibit-panel__tags">${content.tags
							.map(
								(tag) =>
									`<span class="exhibit-panel__tag">${escapeHtml(tag)}</span>`
							)
							.join('')}</div>`
					: ''
			}
			${
				content.detailUrl
					? `<a class="exhibit-panel__link" href="${escapeHtml(
							content.detailUrl
						)}">View Details &rarr;</a>`
					: ''
			}
		</div>
	`;
	// CSS2DRenderer overwrites element.style.display every frame from
	// CSS2DObject.visible, so visibility must be driven via .visible (below).
	panel.style.pointerEvents = 'none';

	const css2dObject = new CSS2DObject(panel);
	css2dObject.position.copy(attachPosition);
	css2dObject.position.y += 2.5;
	css2dObject.visible = false;
	scene.add(css2dObject);

	return {
		object: css2dObject,
		setVisible(visible: boolean) {
			css2dObject.visible = visible;
			panel.style.pointerEvents = visible ? 'auto' : 'none';
		},
		dispose() {
			scene.remove(css2dObject);
			panel.remove();
		}
	};
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
