<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { createControls, type ControlsState } from './controls.js';

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;
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
		let labelRenderer:
			| import('three/examples/jsm/renderers/CSS2DRenderer.js').CSS2DRenderer
			| undefined;
		const panels = new Map<
			import('./types.js').RoomId,
			import('./panel.js').PanelObject
		>();
		let unsubscribeActivation: (() => void) | undefined;
		let dustSystem: { tick: (t: number) => void; dispose: () => void } | undefined;
		const keyPickups = new Map<
			import('./types.js').RoomId,
			{
				mesh: import('three').Mesh;
				light: import('three').PointLight;
				tick: (t: number) => void;
				dispose: () => void;
			}
		>();

		async function init() {
			const THREE = await import('three');
			const [{ applyCollision }, { PLAYER_HEIGHT, ROOMS }] = await Promise.all([
				import('./collision.js'),
				import('./floorplan.js')
			]);

			const { collectKey, hasAllKeys, hasKey, getKeyCount } = await import(
				'$lib/museum/keys.svelte.js'
			);
			const { createKeyPickup } = await import('$lib/museum/keyVisual.js');

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

			// CSS2DRenderer for crisp DOM exhibit panels overlaid on the canvas.
			const { CSS2DRenderer } = await import(
				'three/examples/jsm/renderers/CSS2DRenderer.js'
			);
			labelRenderer = new CSS2DRenderer();
			labelRenderer.setSize(window.innerWidth, window.innerHeight);
			labelRenderer.domElement.style.position = 'absolute';
			labelRenderer.domElement.style.top = '0';
			labelRenderer.domElement.style.left = '0';
			labelRenderer.domElement.style.width = '100%';
			labelRenderer.domElement.style.height = '100%';
			// Overlay never blocks first-person navigation; only visible panel
			// links opt back into pointer events (see panel.ts setVisible).
			labelRenderer.domElement.style.pointerEvents = 'none';
			container.appendChild(labelRenderer.domElement);

			const ambient = new THREE.AmbientLight(0xffffff, 0.3);
			scene.add(ambient);

			const dirLight = new THREE.DirectionalLight(0xfff8e7, 1.2);
			dirLight.position.set(0, 8, -15);
			dirLight.castShadow = true;
			scene.add(dirLight);

			const { buildMuseumGeometry } = await import('./geometry.js');
			buildMuseumGeometry(THREE, scene);

			const { createDustSystem } = await import('./dust.js');
			dustSystem = createDustSystem(THREE, scene);

			const { createAllExhibits } = await import('./exhibits/index.js');
			exhibits = await createAllExhibits(THREE, scene);

			const { createProximitySystem } = await import('./proximity.js');

			const exhibitPositions = new Map<import('./types.js').RoomId, import('three').Vector3>();
			for (const room of ROOMS) {
				if (exhibits.has(room.id)) {
					const [x, y, z] = room.exhibitPosition;
					exhibitPositions.set(room.id, new THREE.Vector3(x, y, z));
				}
			}

			const proximitySystem = createProximitySystem(exhibits, exhibitPositions);

		const KEY_ROOMS = new Set<import('./types.js').RoomId>([
			'vault',
			'protocol',
			'hacker',
			'council',
			'lab'
		]);
		const KEY_DWELL_TIME = 3000;
		const exhibitTimers = new Map<import('./types.js').RoomId, number>();

		// Build one CSS2D panel per exhibit, floating above its artifact.
		// Content is bound from projects.ts via EXHIBIT_MAP; hidden-wing has no entry and gets no panel.
		const { createPanel } = await import('./panel.js');
		const { EXHIBIT_MAP } = await import('./exhibitMap.js');
		for (const room of ROOMS) {
			if (!exhibits.has(room.id)) continue;
			const content = EXHIBIT_MAP.get(room.id);
			if (!content) continue; // skip hidden-wing and any unmapped rooms
			const [x, y, z] = room.exhibitPosition;
			const panel = await createPanel(
				THREE,
				content,
				new THREE.Vector3(x, y, z),
				scene
			);
			panels.set(room.id, panel);
		}

		// Show the active panel, hide all others, on every activation change.
		// Dwell timer for residue keys: start when a key-dropping room is
		// newly activated, clear when focus leaves.
		unsubscribeActivation = proximitySystem.onActivationChange((newId, _wasActive) => {
			for (const [roomId, panel] of panels) {
				panel.setVisible(roomId === newId);
			}
			if (newId) {
				const ex = exhibits.get(newId);
				if (ex) ex.group.scale.setScalar(1.0);
			}

			for (const [roomId] of exhibitTimers) {
				if (roomId !== newId) {
					exhibitTimers.delete(roomId);
				}
			}
			if (newId && KEY_ROOMS.has(newId) && !hasKey(newId)) {
				exhibitTimers.set(newId, Date.now());
			}
		});

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
				labelRenderer?.setSize(window.innerWidth, window.innerHeight);
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

				proximitySystem.update(camera);
				const activeExhibitId = proximitySystem.getActiveExhibitId();

				for (const [roomId, exhibit] of exhibits) {
					const isActive = roomId === activeExhibitId;
					exhibit.tick(t, isActive);
				}

				const now = Date.now();
				for (const [roomId, startTime] of exhibitTimers) {
					if (now - startTime >= KEY_DWELL_TIME) {
						const collected = collectKey(roomId);
						if (collected) {
							const room = ROOMS.find((r) => r.id === roomId);
							if (room) {
								const [x, y, z] = room.exhibitPosition;
								const pos = new THREE.Vector3(x, y + 0.5, z);
								void createKeyPickup(THREE, pos).then(({ mesh, light, tick, dispose }) => {
									if (!scene) return;
									scene.add(mesh);
									scene.add(light);
									keyPickups.set(roomId, { mesh, light, tick, dispose });
								});
							}
						}
						exhibitTimers.delete(roomId);
					}
				}

			for (const [, pickup] of keyPickups) {
				pickup.tick(t);
			}

			dustSystem?.tick(t);

			// Reactive read for future HUD/door wiring (W6/W7).
			void hasAllKeys();
			void getKeyCount();

				renderer.render(scene, camera);
				labelRenderer?.render(scene, camera);
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
			unsubscribeActivation?.();
			for (const [, pickup] of keyPickups) {
				scene?.remove(pickup.mesh);
				scene?.remove(pickup.light);
				pickup.dispose();
			}
			keyPickups.clear();
			for (const panel of panels.values()) {
				panel.dispose();
			}
			panels.clear();
			labelRenderer?.domElement.remove();
			dustSystem?.dispose();
			controlsApi?.dispose();
			renderer?.dispose();
		};
	});
</script>

<div bind:this={container} style="position:relative;width:100vw;height:100vh;overflow:hidden;">
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
