import type * as THREE from 'three';
import { ROOMS, CORRIDORS, type RoomDef, type CorridorDef } from './floorplan.js';
import { createConcreteMaterial, createFloorMaterial, createCeilingMaterial } from './materials.js';

function addBox(
	THREE: typeof import('three'),
	scene: THREE.Scene,
	geometry: THREE.BoxGeometry,
	material: THREE.Material,
	position: [number, number, number]
): void {
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(...position);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add(mesh);
}

function buildCell(
	THREE: typeof import('three'),
	scene: THREE.Scene,
	concreteMaterial: THREE.MeshStandardMaterial,
	ceilingMaterial: THREE.MeshStandardMaterial,
	floorMaterial: THREE.MeshPhysicalMaterial,
	cell: RoomDef | CorridorDef
): void {
	const [cx, _cy, cz] = cell.center;
	const [width, height, depth] = cell.size;

	addBox(
		THREE,
		scene,
		new THREE.BoxGeometry(width, 0.1, depth),
		floorMaterial,
		[cx, -0.05, cz]
	);

	addBox(
		THREE,
		scene,
		new THREE.BoxGeometry(width, 0.1, depth),
		ceilingMaterial,
		[cx, height - 0.05, cz]
	);

	addBox(
		THREE,
		scene,
		new THREE.BoxGeometry(width, height, 0.3),
		concreteMaterial,
		[cx, height / 2, cz + depth / 2 + 0.15]
	);

	addBox(
		THREE,
		scene,
		new THREE.BoxGeometry(width, height, 0.3),
		concreteMaterial,
		[cx, height / 2, cz - depth / 2 - 0.15]
	);

	addBox(
		THREE,
		scene,
		new THREE.BoxGeometry(0.3, height, depth),
		concreteMaterial,
		[cx + width / 2 + 0.15, height / 2, cz]
	);

	addBox(
		THREE,
		scene,
		new THREE.BoxGeometry(0.3, height, depth),
		concreteMaterial,
		[cx - width / 2 - 0.15, height / 2, cz]
	);
}

export function buildMuseumGeometry(
	THREE: typeof import('three'),
	scene: THREE.Scene
): void {
	const concreteMaterial = createConcreteMaterial(THREE);
	const ceilingMaterial = createCeilingMaterial(THREE);
	const floorMaterial = createFloorMaterial(THREE);

	for (const room of ROOMS) {
		buildCell(THREE, scene, concreteMaterial, ceilingMaterial, floorMaterial, room);
	}

	for (const corridor of CORRIDORS) {
		buildCell(THREE, scene, concreteMaterial, ceilingMaterial, floorMaterial, corridor);
	}
}
