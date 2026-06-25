import type * as Three from 'three';
import type { MuseumState } from './types.js';

export interface SceneContext {
	scene: Three.Scene;
	camera: Three.PerspectiveCamera;
	renderer: Three.WebGLRenderer;
	state: MuseumState;
}

/**
 * Initialize the museum scene. Called once after THREE is dynamically imported.
 * Returns a dispose function.
 */
export type CreateSceneFn = (
	canvas: HTMLCanvasElement,
	THREE: typeof import('three')
) => Promise<{ context: SceneContext; dispose: () => void }>;

/**
 * Animate one frame. Called inside requestAnimationFrame.
 */
export type AnimateFn = (context: SceneContext, deltaTime: number) => void;
