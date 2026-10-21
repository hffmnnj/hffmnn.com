import type * as Three from 'three';
import type { Exhibit } from './index.js';
import { breathe } from './breathe.js';

const ORB_COLORS = [0x9966ff, 0x66cc88, 0xffaa44, 0x4488ff, 0xff5555];

interface Orb {
	mesh: Three.Mesh;
	angle: number;
	height: number;
	speed: number;
	phase: number;
	radius: number;
}

export async function createExhibit(
	THREE: typeof import('three'),
	position: [number, number, number]
): Promise<Exhibit> {
	const group = new THREE.Group();

	const coreMaterial = new THREE.MeshStandardMaterial({
		color: 0xffffff,
		emissive: 0x4488ff,
		emissiveIntensity: 1,
		roughness: 0.2,
		metalness: 0.3
	});
	const core = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), coreMaterial);
	core.position.set(0, 1.8, 0);
	core.castShadow = true;
	group.add(core);

	const coreLight = new THREE.PointLight(0x4488ff, 1.5, 5);
	coreLight.position.set(0, 1.2, 0);
	group.add(coreLight);

	const orbs: Orb[] = [];
	const orbCount = 5;
	const radius = 1.5;

	for (let i = 0; i < orbCount; i += 1) {
		const material = new THREE.MeshStandardMaterial({
			color: ORB_COLORS[i],
			emissive: ORB_COLORS[i],
			emissiveIntensity: 0.5,
			roughness: 0.3,
			metalness: 0.2
		});
		const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), material);
		mesh.castShadow = true;

		const angle = (i / orbCount) * Math.PI * 2;
		const height = 1.8 + (i % 2 === 0 ? 0.3 : -0.2);

		mesh.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
		group.add(mesh);

		orbs.push({
			mesh,
			angle,
			height,
			speed: 0.4 + i * 0.08,
			phase: i * 1.2,
			radius
		});
	}

	group.position.set(...position);

	return {
		id: 'council',
		group,
		tick(t: number, active: boolean) {
			if (!active) {
				breathe(group, t);
			}
			const orbitSpeed = active ? 0.7 : 0.25;
			const bobSpeed = active ? 2.5 : 1.2;
			const bobAmount = active ? 0.12 : 0.05;

			for (const orb of orbs) {
				const currentAngle = orb.angle + t * orbitSpeed * orb.speed;
				const x = Math.cos(currentAngle) * orb.radius;
				const z = Math.sin(currentAngle) * orb.radius;
				const y = orb.height + Math.sin(t * bobSpeed + orb.phase) * bobAmount;
				orb.mesh.position.set(x, y, z);

				const material = orb.mesh.material as Three.MeshStandardMaterial;
				material.emissiveIntensity = active ? 0.9 + Math.sin(t * 4 + orb.phase) * 0.25 : 0.5;
			}

			coreMaterial.emissiveIntensity = active ? 1.6 + Math.sin(t * 4) * 0.25 : 1;
			coreLight.intensity = active ? 2.2 + Math.sin(t * 3) * 0.3 : 1.5;
		}
	};
}
