import type * as Three from 'three';

// 4-minute cycle in seconds
const CYCLE_DURATION = 240;

// Color stops for the lighting cycle
// Time: 0=dawn, 0.25=noon, 0.5=dusk, 0.75=night, 1.0=dawn again
const COLOR_STOPS = [
	{ t: 0.0, ambient: 0xff9966, ambientIntensity: 0.3, dir: 0xffaa44, dirIntensity: 0.6 }, // dawn
	{ t: 0.25, ambient: 0xaabbcc, ambientIntensity: 0.5, dir: 0xffffff, dirIntensity: 1.2 }, // noon
	{ t: 0.5, ambient: 0xff8833, ambientIntensity: 0.3, dir: 0xff7711, dirIntensity: 0.8 }, // dusk
	{ t: 0.75, ambient: 0x112244, ambientIntensity: 0.15, dir: 0x2244aa, dirIntensity: 0.25 }, // night
	{ t: 1.0, ambient: 0xff9966, ambientIntensity: 0.3, dir: 0xffaa44, dirIntensity: 0.6 } // dawn again
];

interface LightStop {
	t: number;
	ambient: number;
	ambientIntensity: number;
	dir: number;
	dirIntensity: number;
}

function hexToColor(THREE: typeof import('three'), hex: number): Three.Color {
	return new THREE.Color(hex);
}

function lerpColor(
	THREE: typeof import('three'),
	a: Three.Color,
	b: Three.Color,
	t: number
): Three.Color {
	return new THREE.Color().lerpColors(a, b, t);
}

function sampleCycle(
	THREE: typeof import('three'),
	normalizedTime: number // 0-1
): {
	ambientColor: Three.Color;
	ambientIntensity: number;
	dirColor: Three.Color;
	dirIntensity: number;
} {
	// Find surrounding stops
	let prevStop: LightStop = COLOR_STOPS[0];
	let nextStop: LightStop = COLOR_STOPS[1];

	for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
		if (normalizedTime >= COLOR_STOPS[i].t && normalizedTime <= COLOR_STOPS[i + 1].t) {
			prevStop = COLOR_STOPS[i];
			nextStop = COLOR_STOPS[i + 1];
			break;
		}
	}

	const span = nextStop.t - prevStop.t;
	const localT = span > 0 ? (normalizedTime - prevStop.t) / span : 0;

	return {
		ambientColor: lerpColor(
			THREE,
			hexToColor(THREE, prevStop.ambient),
			hexToColor(THREE, nextStop.ambient),
			localT
		),
		ambientIntensity: prevStop.ambientIntensity + (nextStop.ambientIntensity - prevStop.ambientIntensity) * localT,
		dirColor: lerpColor(
			THREE,
			hexToColor(THREE, prevStop.dir),
			hexToColor(THREE, nextStop.dir),
			localT
		),
		dirIntensity: prevStop.dirIntensity + (nextStop.dirIntensity - prevStop.dirIntensity) * localT
	};
}

export function createDayCycle(
	THREE: typeof import('three'),
	ambientLight: Three.AmbientLight,
	dirLight: Three.DirectionalLight
): {
	tick: (elapsedSeconds: number) => void;
} {
	function tick(elapsed: number) {
		const normalizedTime = (elapsed % CYCLE_DURATION) / CYCLE_DURATION;
		const sample = sampleCycle(THREE, normalizedTime);

		ambientLight.color.copy(sample.ambientColor);
		ambientLight.intensity = sample.ambientIntensity;
		dirLight.color.copy(sample.dirColor);
		dirLight.intensity = sample.dirIntensity;

		// Slowly arc the directional light position (simulate sun/moon movement)
		const angle = normalizedTime * Math.PI * 2;
		dirLight.position.set(
			Math.sin(angle) * 20,
			8 + Math.cos(angle) * 4,
			-15 + Math.cos(angle) * 10
		);
	}

	return { tick };
}
