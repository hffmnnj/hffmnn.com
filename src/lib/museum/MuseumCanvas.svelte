<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let animationId: number | undefined;

	onMount(() => {
		if (!browser) return;

		let renderer: import('three').WebGLRenderer | undefined;
		let scene: import('three').Scene | undefined;
		let camera: import('three').PerspectiveCamera | undefined;
		let removeResizeListener: (() => void) | undefined;
		let mounted = true;

		async function init() {
			const THREE = await import('three');

			if (!mounted) return;

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

			function onResize() {
				if (!camera || !renderer) return;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			}

			window.addEventListener('resize', onResize);
			removeResizeListener = () => window.removeEventListener('resize', onResize);

			function animate() {
				if (!scene || !camera || !renderer) return;

				animationId = requestAnimationFrame(animate);
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
			renderer?.dispose();
		};
	});
</script>

<canvas bind:this={canvas} aria-label="The Museum of James 3D canvas"></canvas>

<style>
	canvas {
		display: block;
		width: 100vw;
		height: 100vh;
	}
</style>
