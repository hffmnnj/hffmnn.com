import type * as THREE from 'three';

export function createConcreteMaterial(THREE: typeof import('three')): THREE.MeshStandardMaterial {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Failed to acquire 2d context for concrete texture');
	}

	ctx.fillStyle = '#8a8074';
	ctx.fillRect(0, 0, 256, 256);

	for (let i = 0; i < 20000; i += 1) {
		const x = Math.random() * 256;
		const y = Math.random() * 256;
		const darkness = 0.05 + Math.random() * 0.25;
		ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
		ctx.fillRect(x, y, 1, 1);
	}

	for (let i = 0; i < 40; i += 1) {
		const x = Math.random() * 256;
		const y = Math.random() * 256;
		const length = 10 + Math.random() * 40;
		const angle = Math.random() * Math.PI * 2;
		ctx.strokeStyle = `rgba(30, 25, 20, ${0.05 + Math.random() * 0.15})`;
		ctx.lineWidth = 0.5 + Math.random();
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
		ctx.stroke();
	}

	const texture = new THREE.CanvasTexture(canvas);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(4, 4);

	return new THREE.MeshStandardMaterial({
		map: texture,
		color: 0x8a8074,
		roughness: 0.92,
		metalness: 0.02
	});
}

export function createCeilingMaterial(THREE: typeof import('three')): THREE.MeshStandardMaterial {
	const material = createConcreteMaterial(THREE);
	material.color.set('#7a7064');
	const map = material.map;
	if (map) {
		map.repeat.set(2, 2);
	}
	return material;
}

export function createFloorMaterial(THREE: typeof import('three')): THREE.MeshPhysicalMaterial {
	return new THREE.MeshPhysicalMaterial({
		color: 0x1a1a1a,
		roughness: 0.28,
		metalness: 0,
		reflectivity: 0.5
	});
}

export function createDoorMaterial(THREE: typeof import('three')): THREE.MeshStandardMaterial {
	return new THREE.MeshStandardMaterial({
		color: 0x2a2a2a,
		roughness: 0.7,
		metalness: 0.3
	});
}
