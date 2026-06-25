<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { createControls, type ControlsState } from './controls.js';

	let canvas: HTMLCanvasElement;
	let animationId: number | undefined;
	let isLocked = $state(false);

	let controls: import('three/examples/jsm/controls/PointerLockControls.js').PointerLockControls | null = $state(null);

	onMount(() => {
		if (!browser) return;

		let renderer: import('three').WebGLRenderer | undefined;
		let scene: import('three').Scene | undefined;
		let camera: import('three').PerspectiveCamera | undefined;
		let controlsApi: {
			controls: import('three/examples/jsm/controls/PointerLockControls.js').PointerLockControls;
			state: ControlsState;
			update: (delta: number) => void;
			dispose: () => void;
		} | undefined;
		let clock: import('three').Clock | undefined;
		let removeResizeListener: (() => void) | undefined;
		let mounted = true;
		let exhibits: Map<
			import('./types.js').RoomId,
			import('./exhibits/index.js').Exhibit
		> = new Map();

		async function init() {
			const THREE = await import('three');
			const [{ applyCollision }, { PLAYER_HEIGHT }] = await Promise.all([
				import('./collision.js'),
				import('./floorplan.js')
			]);

			if (!mounted) return;

			clock = new THREE.Clock();

			scene = new THREE.Scene();
			scene.background = new THREE.Color(0x0a0a0a);

			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			camera.position.set(0, 1.7, 4);

			renderer = new THREE.WebGLRenderer({
				canvas,
				antialias: true
			});
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.shadowMap.enabled = true;

			const ambient = new THREE.AmbientLight(0xffffff, 0.3);
			scene.add(ambient);

			const dirLight = new THREE.DirectionalLight(0xfff8e7, 1.2);
			dirLight.position.set(0, 8, -15);
			dirLight.castShadow = true;
			scene.add(dirLight);

			const { buildMuseumGeometry } = await import('./geometry.js');
			buildMuseumGeometry(THREE, scene);

			const { createAllExhibits } = await import('./exhibits/index.js');
			exhibits = await createAllExhibits(THREE, scene);

			controlsApi = await createControls(camera, canvas, THREE);
			controls = controlsApi.controls;

			controls.addEventListener('lock', () => {
				isLocked = true;
			});
			controls.addEventListener('unlock', () => {
				isLocked = false;
			});

			function onResize() {
				if (!camera || !renderer) return;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			}

			window.addEventListener('resize', onResize);
			removeResizeListener = () => window.removeEventListener('resize', onResize);

			function animate() {
				if (!scene || !camera || !renderer || !clock || !controlsApi) return;

				animationId = requestAnimationFrame(animate);

				const prevX = camera.position.x;
				const prevZ = camera.position.z;

				const delta = clock.getDelta();
				controlsApi.update(delta);

				applyCollision(camera, prevX, prevZ);
				camera.position.y = PLAYER_HEIGHT;

				const t = clock.getElapsedTime();
				for (const [, exhibit] of exhibits) {
					exhibit.tick(t, false); // Wave 3 always false; Wave 3.T3 will pass active state
				}

				renderer.render(scene, camera);
			}

			animate();
		}

		void init();

		return () => {
			mounted = false;

			if (animationId !== undefined) {
				cancelAnimationFrame(animationId);
			}

			removeResizeListener?.();
			controlsApi?.dispose();
			renderer?.dispose();
		};
	});
</script>

<div style="position:relative;width:100vw;height:100vh;overflow:hidden;">
	<canvas bind:this={canvas} style="display:block;width:100%;height:100%;" aria-label="The Museum of James 3D canvas"></canvas>

	{#if !isLocked}
		<div class="museum-overlay">
			<p class="museum-overlay__hint">Click to enter the museum</p>
			<button class="museum-overlay__btn" onclick={() => controls?.lock()}>Enter Museum</button>
		</div>
	{/if}
</div>

<style>
	.museum-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(10, 10, 10, 0.85);
		color: #e8e0d0;
		gap: 1rem;
		font-family: 'Fraunces Variable', serif;
	}

	.museum-overlay__hint {
		font-size: 0.85rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		opacity: 0.5;
	}

	.museum-overlay__btn {
		font-size: 1.5rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		background: transparent;
		border: 1px solid #e8e0d0;
		color: #e8e0d0;
		padding: 0.75rem 2.5rem;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.2s, color 0.2s;
	}

	.museum-overlay__btn:hover {
		background: #e8e0d0;
		color: #0a0a0a;
	}
</style>
