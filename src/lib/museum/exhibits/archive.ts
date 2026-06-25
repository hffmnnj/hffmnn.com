import type * as Three from 'three';
import type { Exhibit } from './index.js';

const CARD_TITLES = ['@capyseo/core', '@capyseo/cli', '@capyseo/sveltekit'];
const CARD_ACCENT = '#e8b84a';

function createCardTexture(THREE: typeof import('three'), title: string): Three.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = 420;
	canvas.height = 570;

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Failed to acquire 2d context for archive card texture');
	}

	ctx.fillStyle = '#1c1915';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = CARD_ACCENT;
	ctx.lineWidth = 6;
	ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

	ctx.fillStyle = '#e8e0d0';
	ctx.font = 'bold 40px "Geist Mono", monospace';
	ctx.textAlign = 'left';
	ctx.fillText(title, 48, 80);

	ctx.fillStyle = '#a89f93';
	ctx.font = '24px system-ui, sans-serif';
	ctx.fillText('specimen card', 48, 120);

	ctx.fillStyle = CARD_ACCENT;
	ctx.font = 'bold 120px serif';
	ctx.globalAlpha = 0.12;
	ctx.textAlign = 'center';
	ctx.fillText('SEO', canvas.width / 2, canvas.height - 90);
	ctx.globalAlpha = 1;

	const texture = new THREE.CanvasTexture(canvas);
	texture.anisotropy = 16;
	return texture;
}

export async function createExhibit(
	THREE: typeof import('three'),
	position: [number, number, number]
): Promise<Exhibit> {
	const group = new THREE.Group();
	const cards: { mesh: Three.Mesh; frame: Three.LineSegments; baseAngle: number; phase: number }[] = [];

	for (let i = 0; i < CARD_TITLES.length; i += 1) {
		const title = CARD_TITLES[i];
		const texture = createCardTexture(THREE, title);
		const material = new THREE.MeshStandardMaterial({
			map: texture,
			emissive: 0xffffff,
			emissiveMap: texture,
			emissiveIntensity: 0.08,
			roughness: 0.6,
			metalness: 0,
			side: THREE.DoubleSide
		});
		const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.9), material);
		mesh.position.set((i - 1) * 1.0, 1.7, 0);

		const baseAngle = (i - 1) * 0.18;
		mesh.rotation.y = baseAngle;
		group.add(mesh);

		const frameGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.4, 1.9));
		const frameMaterial = new THREE.LineBasicMaterial({ color: 0xe8b84a });
		const frame = new THREE.LineSegments(frameGeometry, frameMaterial);
		frame.position.copy(mesh.position);
		frame.rotation.copy(mesh.rotation);
		group.add(frame);

		cards.push({ mesh, frame, baseAngle, phase: i * 1.5 });
	}

	group.position.set(...position);

	return {
		id: 'archive',
		group,
		tick(t: number, active: boolean) {
			const driftSpeed = active ? 0.8 : 0.25;
			const driftAmount = active ? 0.06 : 0.025;

			for (const card of cards) {
				const rotationOffset = Math.sin(t * driftSpeed + card.phase) * driftAmount;
				const yOffset = Math.cos(t * driftSpeed * 0.7 + card.phase) * (active ? 0.08 : 0.04);

				card.mesh.rotation.y = card.baseAngle + rotationOffset;
				card.mesh.position.y = 1.7 + yOffset;
				card.frame.rotation.copy(card.mesh.rotation);
				card.frame.position.copy(card.mesh.position);

				const material = card.mesh.material as Three.MeshStandardMaterial;
				material.emissiveIntensity = active ? 0.18 + Math.sin(t * 3 + card.phase) * 0.05 : 0.08;
			}
		}
	};
}
