import type * as Three from 'three';

// Shaft definitions — which rooms get shafts and where
const SHAFT_DEFS = [
	// Atrium — grand skylight shaft (tallest, widest, most dramatic)
	{ x: 0, y: 7.8, z: -4, radiusTop: 0.3, radiusBottom: 3.5, height: 7.5 },
	// Vault — cold narrow shaft
	{ x: -20, y: 7.8, z: -12, radiusTop: 0.2, radiusBottom: 1.5, height: 7.5 },
	// Protocol Chamber — taller room shaft (y ceiling higher)
	{ x: 0, y: 9.8, z: -26, radiusTop: 0.3, radiusBottom: 2.5, height: 9.5 },
	// Council Hall — mystical shaft
	{ x: -20, y: 8.8, z: -32, radiusTop: 0.25, radiusBottom: 2.0, height: 8.5 },
	// Lab — bright focused lab shaft
	{ x: 20, y: 7.8, z: -32, radiusTop: 0.15, radiusBottom: 1.2, height: 7.5 },
	// Hidden wing hint — single shaft
	{ x: 0, y: 7.8, z: -66, radiusTop: 0.2, radiusBottom: 1.8, height: 7.5 }
];

interface ShaftMesh {
	mesh: Three.Mesh;
	baseOpacity: number;
}

export function createLightShafts(
	THREE: typeof import('three'),
	scene: Three.Scene
): {
	tick: (t: number, dayIntensity: number) => void;
	dispose: () => void;
} {
	const shaftMeshes: ShaftMesh[] = [];

	for (const def of SHAFT_DEFS) {
		const geometry = new THREE.ConeGeometry(
			def.radiusBottom, // bottom radius (at floor level)
			def.height,
			12, // radial segments — low for performance
			1,
			true // open-ended
		);

		const material = new THREE.MeshBasicMaterial({
			color: 0xfff5e0, // warm shaft color
			transparent: true,
			opacity: 0.1,
			side: THREE.BackSide,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});

		const mesh = new THREE.Mesh(geometry, material);
		// Position: the cone's center is at mid-height; we want top at ceiling, pointing down
		// ConeGeometry apex is at +height/2, base at -height/2 when not rotated
		// Rotate 180° on X so the narrow end (apex) is UP (at ceiling) and base DOWN
		mesh.rotation.x = Math.PI;
		mesh.position.set(def.x, def.y - def.height / 2, def.z);

		scene.add(mesh);
		shaftMeshes.push({ mesh, baseOpacity: 0.1 });
	}

	function tick(t: number, dayIntensity: number) {
		// Shafts pulse very gently with time + scale with day intensity
		for (const shaft of shaftMeshes) {
			const mat = shaft.mesh.material as import('three').MeshBasicMaterial;
			const pulse = 1.0 + Math.sin(t * 0.3) * 0.15;
			mat.opacity = shaft.baseOpacity * pulse * (0.5 + dayIntensity * 0.5);
			mat.needsUpdate = true;
		}
	}

	function dispose() {
		for (const shaft of shaftMeshes) {
			shaft.mesh.geometry.dispose();
			(shaft.mesh.material as import('three').MeshBasicMaterial).dispose();
			scene.remove(shaft.mesh);
		}
	}

	return { tick, dispose };
}
