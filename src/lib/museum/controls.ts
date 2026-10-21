import type * as Three from 'three';

export interface ControlsState {
	moveForward: boolean;
	moveBackward: boolean;
	moveLeft: boolean;
	moveRight: boolean;
	velocity: Three.Vector3;
	direction: Three.Vector3;
}

export async function createControls(
	camera: Three.PerspectiveCamera,
	domElement: HTMLElement,
	THREE: typeof import('three')
): Promise<{
	controls: import('three/examples/jsm/controls/PointerLockControls.js').PointerLockControls;
	state: ControlsState;
	update: (delta: number) => void;
	dispose: () => void;
}> {
	const { PointerLockControls } = await import(
		'three/examples/jsm/controls/PointerLockControls.js'
	);

	const controls = new PointerLockControls(camera, domElement);

	const state: ControlsState = {
		moveForward: false,
		moveBackward: false,
		moveLeft: false,
		moveRight: false,
		velocity: new THREE.Vector3(),
		direction: new THREE.Vector3()
	};

	function onKeyDown(event: KeyboardEvent) {
		switch (event.code) {
			case 'KeyW':
			case 'ArrowUp':
				state.moveForward = true;
				break;
			case 'KeyS':
			case 'ArrowDown':
				state.moveBackward = true;
				break;
			case 'KeyA':
			case 'ArrowLeft':
				state.moveLeft = true;
				break;
			case 'KeyD':
			case 'ArrowRight':
				state.moveRight = true;
				break;
		}
	}

	function onKeyUp(event: KeyboardEvent) {
		switch (event.code) {
			case 'KeyW':
			case 'ArrowUp':
				state.moveForward = false;
				break;
			case 'KeyS':
			case 'ArrowDown':
				state.moveBackward = false;
				break;
			case 'KeyA':
			case 'ArrowLeft':
				state.moveLeft = false;
				break;
			case 'KeyD':
			case 'ArrowRight':
				state.moveRight = false;
				break;
		}
	}

	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);

	const SPEED = 8.0;
	const DAMPING = 10.0;

	function update(delta: number) {
		if (!controls.isLocked) return;

		state.velocity.x -= state.velocity.x * DAMPING * delta;
		state.velocity.z -= state.velocity.z * DAMPING * delta;

		state.direction
			.set(Number(state.moveRight) - Number(state.moveLeft), 0, Number(state.moveForward) - Number(state.moveBackward))
			.normalize();

		if (state.moveForward || state.moveBackward) {
			state.velocity.z -= state.direction.z * SPEED * delta * 60;
		}
		if (state.moveLeft || state.moveRight) {
			state.velocity.x -= state.direction.x * SPEED * delta * 60;
		}

		controls.moveRight(-state.velocity.x * delta);
		controls.moveForward(-state.velocity.z * delta);
	}

	function dispose() {
		document.removeEventListener('keydown', onKeyDown);
		document.removeEventListener('keyup', onKeyUp);
		controls.dispose();
	}

	return { controls, state, update, dispose };
}
