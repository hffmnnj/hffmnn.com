import type * as Three from 'three';
import type { Exhibit } from './index.js';

function createSignTexture(THREE: typeof import('three')): Three.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = 1024;
	canvas.height = 256;

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Failed to acquire 2d context for atrium sign texture');
	}

	ctx.fillStyle = '#1a1814';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ece8e0';
	ctx.lineWidth = 12;
	ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

	ctx.fillStyle = '#ece8e0';
	ctx.font = 'bold 80px system-ui, sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.letterSpacing = '8px';
	ctx.fillText('THE MUSEUM OF JAMES', canvas.width / 2, canvas.height / 2);

	const texture = new THREE.CanvasTexture(canvas);
	texture.anisotropy = 16;
	return texture;
}

export async function createExhibit(
	THREE: typeof import('three'),
	position: [number, number, number]
): Promise<Exhibit> {
	const group = new THREE.Group();

	const monolithMaterial = new THREE.MeshStandardMaterial({
		color: 0xece8e0,
		roughness: 0.6,
		metalness: 0.05
	});
	const monolith = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 0.3), monolithMaterial);
	monolith.position.set(0, 2.15, 0);
	monolith.castShadow = true;
	monolith.receiveShadow = true;
	group.add(monolith);

	const signTexture = createSignTexture(THREE);
	const signMaterial = new THREE.MeshStandardMaterial({
		map: signTexture,
		emissive: 0xffffff,
		emissiveMap: signTexture,
		emissiveIntensity: 0.15,
		roughness: 0.4,
		metalness: 0,
		side: THREE.DoubleSide
	});
	const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), signMaterial);
	sign.position.set(0, 3.1, 0.2);
	group.add(sign);

	const pedestalMaterial = new THREE.MeshStandardMaterial({
		color: 0x6a6058,
		roughness: 0.8,
		metalness: 0.02
	});
	const pedestal = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 1), pedestalMaterial);
	pedestal.position.set(0, 0.05, 0);
	pedestal.receiveShadow = true;
	group.add(pedestal);

	group.position.set(...position);

	return {
		id: 'atrium',
		group,
		tick(t: number, _active: boolean) {
			const rotationSpeed = 0.15;
			group.rotation.y = Math.sin(t * rotationSpeed) * 0.08;
			signMaterial.emissiveIntensity = 0.15 + Math.sin(t * 1.5) * 0.05;
		}
	};
}
