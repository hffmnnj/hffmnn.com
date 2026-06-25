import type * as Three from 'three';
import type { Exhibit } from './index.js';

function createScreenTexture(THREE: typeof import('three')): Three.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = 1024;
	canvas.height = 768;

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Failed to acquire 2d context for hacker screen texture');
	}

	ctx.fillStyle = '#061005';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const lines = [
		'# ~/.config/hypr/hyprland.conf',
		'bind = SUPER, RETURN, exec, kitty',
		'bind = SUPER, Q, killactive',
		'bind = SUPER, V, exec, cliphist list | wofi -d | cliphist decode | wl-copy',
		'',
		'# vibearchy init',
		'vibearchy sync --dots ~/.config/hypr',
		'vibearchy theme --apply gruvbox-dark',
		'> scanning ~/.bash_history...',
		'> found 1337 aliases; indexing into vibearchy graph',
		'> dotfile entropy: acceptable'
	];

	ctx.font = '32px "Geist Mono", "Fira Code", monospace';
	ctx.fillStyle = '#00ff44';
	ctx.textBaseline = 'top';

	lines.forEach((line, index) => {
		ctx.fillText(line, 48, 48 + index * 48);
	});

	// Scanline overlay
	ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
	for (let y = 0; y < canvas.height; y += 4) {
		ctx.fillRect(0, y, canvas.width, 1);
	}

	const texture = new THREE.CanvasTexture(canvas);
	texture.anisotropy = 16;
	return texture;
}

export async function createExhibit(
	THREE: typeof import('three'),
	position: [number, number, number]
): Promise<Exhibit> {
	const group = new THREE.Group();

	const caseMaterial = new THREE.MeshStandardMaterial({
		color: 0x2b2b2b,
		roughness: 0.6,
		metalness: 0.1
	});
	const frontCase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.3), caseMaterial);
	frontCase.position.set(0, 1.5, 0);
	frontCase.castShadow = true;
	group.add(frontCase);

	const backCase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.6, 0.6), caseMaterial);
	backCase.position.set(0, 1.5, -0.25);
	group.add(backCase);

	const screenTexture = createScreenTexture(THREE);
	const screenMaterial = new THREE.MeshStandardMaterial({
		map: screenTexture,
		emissive: 0x00ff44,
		emissiveMap: screenTexture,
		emissiveIntensity: 0.4,
		roughness: 0.2,
		metalness: 0
	});
	const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.4), screenMaterial);
	screen.position.set(0, 1.55, 0.16);
	group.add(screen);

	const screenGlow = new THREE.PointLight(0x00ff44, 0.8, 5);
	screenGlow.position.set(0, 1.55, 0.5);
	group.add(screenGlow);

	const antennaMaterial = new THREE.MeshStandardMaterial({
		color: 0x888888,
		metalness: 0.8,
		roughness: 0.2
	});
	const leftAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6), antennaMaterial);
	leftAntenna.position.set(-0.7, 2.55, -0.1);
	leftAntenna.rotation.z = -0.2;
	group.add(leftAntenna);

	const rightAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6), antennaMaterial);
	rightAntenna.position.set(0.7, 2.55, -0.1);
	rightAntenna.rotation.z = 0.2;
	group.add(rightAntenna);

	const stand = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.8), caseMaterial);
	stand.position.set(0, 0.7, -0.1);
	group.add(stand);

	const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 1), caseMaterial);
	base.position.set(0, 0.05, -0.1);
	group.add(base);

	group.position.set(...position);

	return {
		id: 'hacker',
		group,
		tick(t: number, active: boolean) {
			const flickerSpeed = active ? 18 : 8;
			const baseIntensity = active ? 0.9 : 0.35;
			screenMaterial.emissiveIntensity = baseIntensity + Math.sin(t * flickerSpeed) * 0.12;
			screenGlow.intensity = active ? 1.4 + Math.sin(t * flickerSpeed) * 0.2 : 0.8;
		}
	};
}
