import type * as Three from 'three';

/**
 * Apply idle breathing animation to an exhibit group.
 * Call this inside each exhibit's tick() when active === false.
 *
 * @param group - the exhibit group
 * @param t - elapsed time in seconds
 * @param speed - breathing speed multiplier (default 1.0)
 */
export function breathe(
	group: Three.Group,
	t: number,
	speed: number = 1.0
): void {
	// Subtle scale pulse: oscillates between 0.97 and 1.03
	const scale = 1.0 + Math.sin(t * speed * 0.8) * 0.03;
	group.scale.setScalar(scale);

	// Slight Y hover: bobs up and down by 0.05 units
	const baseY = group.userData['baseY'] as number | undefined;
	if (baseY === undefined) {
		group.userData['baseY'] = group.position.y;
	}
	group.position.y = (group.userData['baseY'] as number) + Math.sin(t * speed * 0.6) * 0.05;

	// Dim emissive pulse on any MeshStandardMaterial children
	group.traverse((child) => {
		if ((child as { isMesh?: boolean }).isMesh) {
			const mesh = child as Three.Mesh;
			const mat = mesh.material;
			if (Array.isArray(mat)) {
				mat.forEach((m) => applyEmissivePulse(m, t, speed));
			} else {
				applyEmissivePulse(mat, t, speed);
			}
		}
	});
}

function applyEmissivePulse(
	mat: Three.Material,
	t: number,
	speed: number
): void {
	if ('emissiveIntensity' in mat) {
		const m = mat as Three.MeshStandardMaterial;
		// Pulse emissive intensity between base*0.7 and base*1.3
		const base = (m.userData['baseEmissive'] as number | undefined) ?? m.emissiveIntensity;
		if (!('baseEmissive' in m.userData)) {
			m.userData['baseEmissive'] = base;
		}
		m.emissiveIntensity = base + Math.sin(t * speed * 1.2 + 0.5) * base * 0.3;
	}
}
