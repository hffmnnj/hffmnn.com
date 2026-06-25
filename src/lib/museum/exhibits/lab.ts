import type * as Three from 'three';
import type { Exhibit } from './index.js';
import { breathe } from './breathe.js';

export async function createExhibit(
	THREE: typeof import('three'),
	position: [number, number, number]
): Promise<Exhibit> {
	const group = new THREE.Group();

	const curve = new THREE.QuadraticBezierCurve3(
		new THREE.Vector3(-1, 0, 0),
		new THREE.Vector3(0, 0.7, 0),
		new THREE.Vector3(1, 0, 0)
	);

	const bananaMaterial = new THREE.MeshStandardMaterial({
		color: 0xffdd00,
		emissive: 0x332200,
		emissiveIntensity: 0.2,
		roughness: 0.3,
		metalness: 0.05
	});
	const banana = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.25, 16, false), bananaMaterial);
	banana.position.set(0, 2.2, 0);
	banana.castShadow = true;
	group.add(banana);

	const glassMaterial = new THREE.MeshPhysicalMaterial({
		color: 0x88bbff,
		transparent: true,
		opacity: 0.4,
		roughness: 0.1,
		metalness: 0,
		transmission: 0.3,
		thickness: 0.2
	});

	const flaskBody = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 1.2, 24), glassMaterial);
	flaskBody.position.set(0, 0.7, 0);
	group.add(flaskBody);

	const flaskNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 0.5, 24), glassMaterial);
	flaskNeck.position.set(0, 1.55, 0);
	group.add(flaskNeck);

	const flaskRim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 8, 24), glassMaterial);
	flaskRim.position.set(0, 1.82, 0);
	flaskRim.rotation.x = Math.PI / 2;
	group.add(flaskRim);

	const fluidMaterial = new THREE.MeshStandardMaterial({
		color: 0x44ff88,
		emissive: 0x113322,
		emissiveIntensity: 0.3,
		transparent: true,
		opacity: 0.8,
		roughness: 0.2
	});
	const fluid = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.28, 0.6, 24), fluidMaterial);
	fluid.position.set(0, 0.55, 0);
	group.add(fluid);

	const light = new THREE.PointLight(0xffff44, 1.2, 5);
	light.position.set(0, 2.4, 0);
	group.add(light);

	group.position.set(...position);

	return {
		id: 'lab',
		group,
		tick(t: number, active: boolean) {
			if (!active) {
				breathe(group, t);
			}
			const bobSpeed = active ? 1.5 : 0.6;
			const bobAmount = active ? 0.15 : 0.06;
			banana.position.y = 2.2 + Math.sin(t * bobSpeed) * bobAmount;
			banana.rotation.y = t * 0.4;
			banana.rotation.z = Math.sin(t * 0.7) * 0.05;

			light.intensity = active ? 1.8 + Math.sin(t * 3) * 0.3 : 1.2;
			bananaMaterial.emissiveIntensity = active ? 0.5 : 0.2;
		}
	};
}
