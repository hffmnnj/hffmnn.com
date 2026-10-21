import type * as Three from 'three';

export async function createKeyPickup(
	THREE: typeof import('three'),
	position: Three.Vector3
): Promise<{
	mesh: Three.Mesh;
	light: Three.PointLight;
	tick: (t: number) => void;
	dispose: () => void;
}> {
	const geometry = new THREE.OctahedronGeometry(0.15);
	const material = new THREE.MeshStandardMaterial({
		color: 0xffcc44,
		emissive: 0xffaa00,
		emissiveIntensity: 2.0,
		metalness: 0.8,
		roughness: 0.2
	});

	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.copy(position);
	mesh.position.y += 0.8;

	const light = new THREE.PointLight(0xffcc44, 1.5, 3);
	light.position.copy(mesh.position);

	function tick(t: number): void {
		mesh.rotation.y = t * 2;
		mesh.position.y = position.y + 0.8 + Math.sin(t * 3) * 0.1;
		light.position.copy(mesh.position);
	}

	function dispose(): void {
		geometry.dispose();
		material.dispose();
		light.dispose();
	}

	return { mesh, light, tick, dispose };
}
