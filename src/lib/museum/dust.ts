import type * as Three from 'three';

// Configuration
const PARTICLE_COUNT = 3000;
// Spread across the museum (wider than single room)
const SPREAD_X = 50;
const SPREAD_Y = 6; // from floor to ceiling-ish
const SPREAD_Z = 70; // museum is about 70 units long

export function createDustSystem(
	THREE: typeof import('three'),
	scene: Three.Scene
): {
	tick: (t: number) => void;
	dispose: () => void;
} {
	const geometry = new THREE.BufferGeometry();

	// Initial positions — random in museum bounds
	const positions = new Float32Array(PARTICLE_COUNT * 3);
	const speeds = new Float32Array(PARTICLE_COUNT);
	const phases = new Float32Array(PARTICLE_COUNT);
	const driftX = new Float32Array(PARTICLE_COUNT);
	const driftZ = new Float32Array(PARTICLE_COUNT);

	for (let i = 0; i < PARTICLE_COUNT; i++) {
		const i3 = i * 3;
		positions[i3] = (Math.random() - 0.5) * SPREAD_X;
		positions[i3 + 1] = Math.random() * SPREAD_Y;
		positions[i3 + 2] = -Math.random() * SPREAD_Z; // negative Z (museum extends back)
		speeds[i] = 0.1 + Math.random() * 0.3; // vertical drift speed
		phases[i] = Math.random() * Math.PI * 2; // phase offset
		driftX[i] = (Math.random() - 0.5) * 0.002; // slow lateral drift per frame
		driftZ[i] = (Math.random() - 0.5) * 0.002;
	}

	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	const material = new THREE.PointsMaterial({
		color: 0xd4c8b0,
		size: 0.03,
		transparent: true,
		opacity: 0.35,
		sizeAttenuation: true,
		depthWrite: false // prevents z-fighting with walls
	});

	const points = new THREE.Points(geometry, material);
	scene.add(points);

	function tick(t: number) {
		const pos = geometry.attributes['position'] as Three.BufferAttribute;
		const arr = pos.array as Float32Array;

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const i3 = i * 3;
			// Gentle sine drift vertically
			arr[i3 + 1] += Math.sin(t * speeds[i] + phases[i]) * 0.0003;

			// Slow lateral drift
			arr[i3] += driftX[i];
			arr[i3 + 2] += driftZ[i];

			// Wrap particles that drift too far
			if (arr[i3 + 1] > SPREAD_Y) arr[i3 + 1] = 0.1;
			if (arr[i3 + 1] < 0) arr[i3 + 1] = SPREAD_Y - 0.1;
			if (Math.abs(arr[i3]) > SPREAD_X / 2) driftX[i] *= -1;
			if (arr[i3 + 2] > 0) arr[i3 + 2] = -SPREAD_Z + 1;
			if (arr[i3 + 2] < -SPREAD_Z) arr[i3 + 2] = -0.5;
		}

		pos.needsUpdate = true;
	}

	function dispose() {
		scene.remove(points);
		geometry.dispose();
		material.dispose();
	}

	return { tick, dispose };
}
