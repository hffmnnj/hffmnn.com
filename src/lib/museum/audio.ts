import type * as Three from 'three';
import type { RoomId } from './types.js';

interface RoomAudioProfile {
	baseFreq: number;
	detune: number;
	filterCutoff: number;
	gainLevel: number;
}

interface SpatialAudioRefs {
	THREE: typeof Three;
	camera: Three.PerspectiveCamera;
	scene: Three.Scene;
}

interface SpatialCue {
	listener: Three.AudioListener;
	audio: Three.PositionalAudio;
	oscillator: OscillatorNode;
	gain: GainNode;
}

export interface MuseumAudioController {
	start: () => void;
	setRoom: (roomId: RoomId | null) => void;
	attachSpatialCues: (
		THREE: typeof Three,
		camera: Three.PerspectiveCamera,
		scene: Three.Scene
	) => void;
	stop: () => void;
}

const ROOM_PROFILES: Partial<Record<RoomId, RoomAudioProfile>> = {
	atrium: { baseFreq: 55, detune: 3, filterCutoff: 180, gainLevel: 0.12 },
	vault: { baseFreq: 40, detune: 5, filterCutoff: 100, gainLevel: 0.1 },
	protocol: { baseFreq: 65, detune: 2, filterCutoff: 250, gainLevel: 0.09 },
	hacker: { baseFreq: 110, detune: 8, filterCutoff: 200, gainLevel: 0.08 },
	council: { baseFreq: 45, detune: 4, filterCutoff: 150, gainLevel: 0.11 },
	lab: { baseFreq: 75, detune: 6, filterCutoff: 300, gainLevel: 0.07 },
	archive: { baseFreq: 50, detune: 3, filterCutoff: 120, gainLevel: 0.08 },
	'hidden-wing': { baseFreq: 30, detune: 1, filterCutoff: 80, gainLevel: 0.15 }
};

const DEFAULT_PROFILE: RoomAudioProfile = {
	baseFreq: 55,
	detune: 3,
	filterCutoff: 160,
	gainLevel: 0.08
};

const HIDDEN_WING_CUE_POSITION = { x: 0, y: 1.4, z: -62 } as const;

export function createMuseumAudio(): MuseumAudioController {
	let ctx: AudioContext | null = null;
	let osc1: OscillatorNode | null = null;
	let osc2: OscillatorNode | null = null;
	let filter: BiquadFilterNode | null = null;
	let masterGain: GainNode | null = null;
	let started = false;
	let spatialRefs: SpatialAudioRefs | null = null;
	let spatialCue: SpatialCue | null = null;
	let stopTimer: ReturnType<typeof setTimeout> | null = null;
	let lastRoom: RoomId | null = null;
	let appliedRoom: RoomId | null | undefined;

	function attachSpatialCues(
		THREE: typeof Three,
		camera: Three.PerspectiveCamera,
		scene: Three.Scene
	): void {
		spatialRefs = { THREE, camera, scene };
	}

	function start(): void {
		if (started) return;
		if (typeof AudioContext === 'undefined') return;

		try {
			ctx = new AudioContext();
			if (ctx.state === 'suspended') {
				void ctx.resume().catch(() => {
					// Browser declined audio resume; keep museum interaction silent.
				});
			}

			masterGain = ctx.createGain();
			masterGain.gain.setValueAtTime(0, ctx.currentTime);
			masterGain.gain.linearRampToValueAtTime(DEFAULT_PROFILE.gainLevel, ctx.currentTime + 3);
			masterGain.connect(ctx.destination);

			filter = ctx.createBiquadFilter();
			filter.type = 'lowpass';
			filter.frequency.setValueAtTime(DEFAULT_PROFILE.filterCutoff, ctx.currentTime);
			filter.Q.setValueAtTime(1.5, ctx.currentTime);
			filter.connect(masterGain);

			osc1 = ctx.createOscillator();
			osc1.type = 'sawtooth';
			osc1.frequency.setValueAtTime(DEFAULT_PROFILE.baseFreq, ctx.currentTime);
			osc1.connect(filter);
			osc1.start();

			osc2 = ctx.createOscillator();
			osc2.type = 'sawtooth';
			osc2.frequency.setValueAtTime(DEFAULT_PROFILE.baseFreq + DEFAULT_PROFILE.detune, ctx.currentTime);
			osc2.connect(filter);
			osc2.start();

			createSpatialCue();
			started = true;
			if (lastRoom) setRoom(lastRoom);
		} catch {
			resetAudioState();
		}
	}

	function setRoom(roomId: RoomId | null): void {
		lastRoom = roomId;
		if (!ctx || !filter || !masterGain || !osc1 || !osc2) return;
		if (appliedRoom === roomId) return;

		const profile = (roomId ? ROOM_PROFILES[roomId] : null) ?? DEFAULT_PROFILE;
		const t = ctx.currentTime;
		osc1.frequency.cancelScheduledValues(t);
		osc2.frequency.cancelScheduledValues(t);
		filter.frequency.cancelScheduledValues(t);
		masterGain.gain.cancelScheduledValues(t);
		osc1.frequency.linearRampToValueAtTime(profile.baseFreq, t + 2);
		osc2.frequency.linearRampToValueAtTime(profile.baseFreq + profile.detune, t + 2);
		filter.frequency.linearRampToValueAtTime(profile.filterCutoff, t + 2);
		masterGain.gain.linearRampToValueAtTime(profile.gainLevel, t + 1.5);

		if (spatialCue) {
			const cueGain = roomId === 'hidden-wing' ? 0.035 : 0.01;
			spatialCue.gain.gain.cancelScheduledValues(t);
			spatialCue.gain.gain.linearRampToValueAtTime(cueGain, t + 1.5);
		}

		appliedRoom = roomId;
	}

	function stop(): void {
		if (stopTimer) {
			clearTimeout(stopTimer);
			stopTimer = null;
		}

		if (!ctx) {
			resetSpatialCue();
			return;
		}

		const closeContext = ctx;
		const t = closeContext.currentTime;
		masterGain?.gain.cancelScheduledValues(t);
		masterGain?.gain.linearRampToValueAtTime(0, t + 1);
		spatialCue?.gain.gain.cancelScheduledValues(t);
		spatialCue?.gain.gain.linearRampToValueAtTime(0, t + 1);

		stopTimer = setTimeout(() => {
			stopOscillator(osc1);
			stopOscillator(osc2);
			if (spatialCue) stopOscillator(spatialCue.oscillator);
			void closeContext.close().catch(() => {
				// Closing can fail if the browser already reclaimed the context.
			});
			resetAudioState();
		}, 1200);
	}

	function createSpatialCue(): void {
		if (!spatialRefs || spatialCue) return;

		try {
			const { THREE, camera, scene } = spatialRefs;
			const listener = new THREE.AudioListener();
			camera.add(listener);

			const audio = new THREE.PositionalAudio(listener);
			audio.position.set(HIDDEN_WING_CUE_POSITION.x, HIDDEN_WING_CUE_POSITION.y, HIDDEN_WING_CUE_POSITION.z);
			audio.setRefDistance(4);
			audio.setRolloffFactor(2.5);
			audio.setDistanceModel('exponential');

			const oscillator = audio.context.createOscillator();
			oscillator.type = 'sine';
			oscillator.frequency.setValueAtTime(92, audio.context.currentTime);

			const gain = audio.context.createGain();
			gain.gain.setValueAtTime(0.01, audio.context.currentTime);
			oscillator.connect(gain);
			audio.setNodeSource(gain);
			oscillator.start();

			scene.add(audio);
			spatialCue = { listener, audio, oscillator, gain };
		} catch {
			resetSpatialCue();
		}
	}

	function resetSpatialCue(): void {
		if (!spatialCue) return;
		spatialRefs?.camera.remove(spatialCue.listener);
		spatialRefs?.scene.remove(spatialCue.audio);
		spatialCue = null;
	}

	function resetAudioState(): void {
		resetSpatialCue();
		ctx = null;
		osc1 = null;
		osc2 = null;
		filter = null;
		masterGain = null;
		started = false;
		appliedRoom = undefined;
	}

	return { start, setRoom, attachSpatialCues, stop };
}

function stopOscillator(node: OscillatorNode | null): void {
	try {
		node?.stop();
	} catch {
		// Oscillator may already be stopped during teardown.
	}
}
