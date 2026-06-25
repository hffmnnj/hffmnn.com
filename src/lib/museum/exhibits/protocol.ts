import type * as Three from 'three';
import type { Exhibit } from './index.js';
import { breathe } from './breathe.js';

const NODE_COLORS = [
	0x2288ff, // blue
	0x44cc66, // green
	0xffaa33, // orange
	0xcc66ff, // purple
	0xeeeeee // white
];

export async function createExhibit(
	THREE: typeof import('three'),
	position: [number, number, number]
): Promise<Exhibit> {
	const group = new THREE.Group();
	const nodes: Three.Mesh[] = [];

	const nodePositions: [number, number, number][] = [
		[0, 1.7, 0],
		[0, 2.1, 0],
		[-0.6, 1.9, 0],
		[0.6, 1.9, 0],
		[0, 1.9, 0.45]
	];

	const edgePairs: [number, number][] = [
		[0, 1],
		[0, 2],
		[0, 3],
		[0, 4],
		[1, 2],
		[2, 4],
		[4, 3],
		[3, 1]
	];

	for (let i = 0; i < nodePositions.length; i += 1) {
		const [x, y, z] = nodePositions[i];
		const material = new THREE.MeshStandardMaterial({
			color: NODE_COLORS[i],
			emissive: NODE_COLORS[i],
			emissiveIntensity: 0.6,
			roughness: 0.3,
			metalness: 0.1
		});
		const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), material);
		sphere.position.set(x, y, z);
		sphere.castShadow = true;
		group.add(sphere);
		nodes.push(sphere);
	}

	const edgeMaterial = new THREE.MeshStandardMaterial({
		color: 0x333333,
		roughness: 0.8,
		metalness: 0.1
	});

	for (const [a, b] of edgePairs) {
		const start = new THREE.Vector3(...nodePositions[a]);
		const end = new THREE.Vector3(...nodePositions[b]);
		const mid = start.clone().add(end).multiplyScalar(0.5);
		const length = start.distanceTo(end);

		const edge = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, length, 12), edgeMaterial);
		edge.position.copy(mid);
		edge.lookAt(end);
		edge.rotateX(Math.PI / 2);
		group.add(edge);
	}

	group.position.set(...position);

	return {
		id: 'protocol',
		group,
		tick(t: number, active: boolean) {
			if (!active) {
				breathe(group, t);
			}
			const orbitSpeed = active ? 0.8 : 0.25;
			group.rotation.y = t * orbitSpeed;

			nodes.forEach((node, i) => {
				const material = node.material as Three.MeshStandardMaterial;
				const baseIntensity = active ? 1.0 : 0.5;
				material.emissiveIntensity = baseIntensity + Math.sin(t * 3 + i * 1.2) * 0.25;
			});
		}
	};
}
