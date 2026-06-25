import type * as Three from 'three';
import type { Exhibit } from './index.js';

export async function createExhibit(
	THREE: typeof import('three'),
	position: [number, number, number]
): Promise<Exhibit> {
	const group = new THREE.Group();

	const keystoneMaterial = new THREE.MeshStandardMaterial({
		color: 0x4a6080,
		metalness: 0.7,
		roughness: 0.2,
		wireframe: false
	});
	const keystone = new THREE.Mesh(new THREE.OctahedronGeometry(1.2), keystoneMaterial);
	keystone.position.set(0, 1.8, 0);
	keystone.castShadow = true;
	group.add(keystone);

	const ringMaterial = new THREE.MeshStandardMaterial({
		color: 0x003388,
		emissive: 0x001144,
		emissiveIntensity: 0.5,
		metalness: 0.8,
		roughness: 0.2,
		side: THREE.DoubleSide
	});
	const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 8, 32), ringMaterial);
	ring.position.set(0, 1.8, 0);
	group.add(ring);

	const glow = new THREE.PointLight(0x4499ff, 1.5, 6);
	glow.position.set(0, 1.8, 0);
	group.add(glow);

	group.position.set(...position);

	return {
		id: 'vault',
		group,
		tick(t: number, active: boolean) {
			const speed = active ? 1.2 : 0.3;
			keystone.rotation.y = t * speed;
			keystone.rotation.x = t * speed * 0.3;
			ring.rotation.z = -t * speed * 0.5;
			ringMaterial.emissiveIntensity = active ? 1.2 + Math.sin(t * 6) * 0.3 : 0.5 + Math.sin(t * 2) * 0.15;
			glow.intensity = active ? 2.2 + Math.sin(t * 5) * 0.4 : 1.5;
		}
	};
}
