import type * as Three from 'three';

const DOOR_POSITION: [number, number, number] = [0, 4, -50];
const DOOR_SIZE: [number, number, number] = [4, 8, 0.4];
const OPEN_ANIMATION_DURATION = 2.0;

export interface HiddenDoor {
	mesh: Three.Mesh;
	isOpen: () => boolean;
	tick: (t: number, allKeysCollected: boolean) => void;
	dispose: () => void;
}

export function createHiddenDoor(
	THREE: typeof import('three'),
	scene: Three.Scene
): HiddenDoor {
	const geometry = new THREE.BoxGeometry(...DOOR_SIZE);
	const material = new THREE.MeshStandardMaterial({
		color: 0x1a1a2a,
		roughness: 0.6,
		metalness: 0.8,
		emissive: 0x110022,
		emissiveIntensity: 0.5
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(...DOOR_POSITION);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add(mesh);

	const stripeGeo = new THREE.BoxGeometry(3.6, 0.05, 0.45);
	const stripeMat = new THREE.MeshStandardMaterial({
		color: 0x8866aa,
		emissive: 0x442266,
		emissiveIntensity: 1.5,
		metalness: 0.9,
		roughness: 0.1
	});

	const stripes: Three.Mesh[] = [];
	for (let i = 0; i < 5; i++) {
		const stripe = new THREE.Mesh(stripeGeo, stripeMat.clone());
		stripe.position.set(0, 1 + i * 1.2, DOOR_POSITION[2]);
		scene.add(stripe);
		stripes.push(stripe);
	}

	let openProgress = 0;
	let wasAllKeys = false;
	let openStartTime = 0;

	function isOpen(): boolean {
		return openProgress >= 1.0;
	}

	function updateStripeGlow(keyCount: number) {
		stripes.forEach((stripe, i) => {
			const mat = stripe.material as Three.MeshStandardMaterial;
			mat.emissiveIntensity = i < keyCount ? 2.0 : 0.3;
			mat.needsUpdate = true;
		});
	}

	function tick(t: number, allKeysCollected: boolean) {
		if (allKeysCollected && !wasAllKeys) {
			openStartTime = t;
			wasAllKeys = true;
		}

		if (wasAllKeys && openProgress < 1.0) {
			openProgress = Math.min(1.0, (t - openStartTime) / OPEN_ANIMATION_DURATION);

			const p = openProgress;
			const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

			mesh.position.y = DOOR_POSITION[1] + eased * DOOR_SIZE[1];
			stripes.forEach((stripe, i) => {
				stripe.position.y = 1 + i * 1.2 + eased * DOOR_SIZE[1];
			});
		}
	}

	mesh.userData['updateStripeGlow'] = updateStripeGlow;

	function dispose() {
		scene.remove(mesh);
		mesh.geometry.dispose();
		material.dispose();

		stripes.forEach((stripe) => {
			scene.remove(stripe);
			stripe.geometry.dispose();
			(stripe.material as Three.MeshStandardMaterial).dispose();
		});
		stripeGeo.dispose();
	}

	return { mesh, isOpen, tick, dispose };
}
