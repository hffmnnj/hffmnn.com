// hiddenWing.ts — the reward room behind the locked door.
// Holds a personal lore artifact (handwritten note), three secret CSS2D
// text fragments, and a centrepiece message. Room center: [0, 0, -62],
// size 12×8×12 → X ∈ [-6, 6], Y ∈ [0, 8], Z ∈ [-56, -68].
import type * as Three from 'three';
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export async function createHiddenWing(
	THREE: typeof import('three'),
	scene: Three.Scene,
	// labelRenderer is wired by MuseumCanvas; we attach CSS2DObjects to the
	// scene, which the existing labelRenderer already renders each frame.
	_labelRenderer: CSS2DRenderer
): Promise<{
	group: Three.Group;
	tick: (t: number) => void;
	dispose: () => void;
}> {
	const { CSS2DObject } = await import(
		'three/examples/jsm/renderers/CSS2DRenderer.js'
	);

	const group = new THREE.Group();

	// ── 1. LORE ARTIFACT — "The Origin Note" ─────────────────────────────────
	// A tilted plane carrying a canvas texture that reads as a handwritten note,
	// leaned against the back wall under a warm spotlight.

	const noteCanvas = document.createElement('canvas');
	noteCanvas.width = 512;
	noteCanvas.height = 640;
	const ctx = noteCanvas.getContext('2d')!;

	// Aged paper background.
	ctx.fillStyle = '#f5f0e8';
	ctx.fillRect(0, 0, 512, 640);

	// Speckle the paper with faint aging noise.
	for (let i = 0; i < 2000; i++) {
		ctx.fillStyle = `rgba(${100 + Math.random() * 50}, ${
			80 + Math.random() * 40
		}, ${60 + Math.random() * 40}, ${Math.random() * 0.05})`;
		ctx.fillRect(
			Math.random() * 512,
			Math.random() * 640,
			Math.random() * 4 + 1,
			Math.random() * 2 + 1
		);
	}

	// Handwritten-style body copy.
	ctx.fillStyle = '#1a1a2a';
	ctx.font = 'italic 22px Georgia, serif';

	const noteLines = [
		"I build things because I can't",
		'not build them.',
		'',
		'Every project here started as',
		'a problem I kept thinking about',
		"at 2am. The itch that wouldn't",
		'go away.',
		'',
		'Enclave Mail: email should be',
		'private. Full stop.',
		'',
		'GoopSpec: AI ships the wrong',
		'thing. Always. So I made it',
		'impossible to skip the spec.',
		'',
		'The rest: tools I wanted to',
		'exist. So I built them.',
		'',
		'Thanks for looking closely.',
		'',
		'— J'
	];

	let textY = 60;
	for (const line of noteLines) {
		if (line === '') {
			textY += 18;
			continue;
		}
		// Subtle per-line wobble to fake a human hand.
		const wobble = (Math.random() - 0.5) * 2;
		ctx.fillText(line, 40 + wobble, textY);
		textY += 30;
	}

	// Folded-corner crease in the top right.
	ctx.strokeStyle = 'rgba(0,0,0,0.08)';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(480, 0);
	ctx.lineTo(512, 30);
	ctx.moveTo(480, 0);
	ctx.lineTo(512, 0);
	ctx.lineTo(512, 30);
	ctx.stroke();

	const noteTexture = new THREE.CanvasTexture(noteCanvas);
	noteTexture.colorSpace = THREE.SRGBColorSpace;
	const noteGeometry = new THREE.PlaneGeometry(2.5, 3.2);
	const noteMaterial = new THREE.MeshStandardMaterial({
		map: noteTexture,
		roughness: 0.85,
		metalness: 0,
		emissive: 0xfff5dd,
		emissiveIntensity: 0.1
	});
	const noteMesh = new THREE.Mesh(noteGeometry, noteMaterial);
	// Lean it against the back wall (Z = -68), pulled slightly inward to avoid
	// z-fighting with the wall plane, tilted to face the entrance.
	noteMesh.position.set(0, 2.0, -67.4);
	noteMesh.rotation.x = -0.1;
	group.add(noteMesh);

	// Warm spotlight grazing the note from above the entrance side.
	const noteLight = new THREE.SpotLight(0xfff0cc, 2.5, 12, Math.PI / 6, 0.4);
	noteLight.position.set(0, 7, -63);
	noteLight.target = noteMesh;
	group.add(noteLight);
	group.add(noteLight.target);

	// ── 2. SECRET TEXT FRAGMENTS (CSS2D) ─────────────────────────────────────
	// World-space positions kept inside the room volume.

	const fragments: { text: string; pos: [number, number, number] }[] = [
		{
			text: '[ FRAGMENT I ]\n\nThe first project I ever shipped\nwas a Discord bot. It was bad.\nI was very proud of it.',
			pos: [-3.5, 2.5, -64]
		},
		{
			text: "[ FRAGMENT II ]\n\nI still use Vibearchy as my\ndaily driver. The dotfiles are\nnever finished. That's the point.",
			pos: [3.5, 2.5, -64]
		},
		{
			text: '[ FRAGMENT III ]\n\nGoopSpec built itself using\nGoopSpec. That one kept me\nup for a while.',
			pos: [0, 2.5, -60]
		}
	];

	// Track every CSS2DObject + its element so dispose() can fully tear down.
	const cssObjects: Three.Object3D[] = [];
	const cssElements: HTMLElement[] = [];

	for (const frag of fragments) {
		const div = document.createElement('div');
		div.className = 'lore-fragment';
		div.textContent = frag.text;

		const css2d = new CSS2DObject(div);
		css2d.position.set(...frag.pos);
		scene.add(css2d);
		cssObjects.push(css2d);
		cssElements.push(div);
	}

	// ── 3. CENTREPIECE — "Thanks for looking properly" ───────────────────────

	const thanksDiv = document.createElement('div');
	thanksDiv.className = 'lore-thanks';
	thanksDiv.innerHTML = `
		<span class="lore-thanks__line1">Thanks for looking properly.</span>
		<span class="lore-thanks__line2">Most people don't make it this far.</span>
	`;
	const thanksCss2d = new CSS2DObject(thanksDiv);
	thanksCss2d.position.set(0, 4.5, -62);
	scene.add(thanksCss2d);
	cssObjects.push(thanksCss2d);
	cssElements.push(thanksDiv);

	// Soft violet glow at the heart of the room.
	const centerGlow = new THREE.PointLight(0xcc88ff, 1.5, 10);
	centerGlow.position.set(0, 3, -62);
	group.add(centerGlow);

	scene.add(group);

	function tick(t: number) {
		// Gentle note sway, as if it breathes with the room.
		noteMesh.rotation.z = Math.sin(t * 0.4) * 0.02;
		// Slow pulse on the centre glow.
		centerGlow.intensity = 1.5 + Math.sin(t * 1.2) * 0.5;
	}

	function dispose() {
		scene.remove(group);
		group.remove(noteLight.target);
		noteTexture.dispose();
		noteGeometry.dispose();
		noteMaterial.dispose();
		for (const obj of cssObjects) {
			scene.remove(obj);
		}
		for (const el of cssElements) {
			el.remove();
		}
	}

	return { group, tick, dispose };
}
