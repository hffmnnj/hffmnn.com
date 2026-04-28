export interface MagneticParams {
	/** How far the element moves toward the cursor (multiplier, 0–1). Default: 0.3 */
	strength?: number;
	/** Enable 3D tilt (rotateX/rotateY). Default: false */
	tilt?: boolean;
	/** Max tilt in degrees. Default: 4 */
	tiltMax?: number;
	/** Interaction radius in px. Default: 120 */
	radius?: number;
}

/**
 * `use:magnetic` — cursor-proximity magnetic pull + optional 3D tilt.
 *
 * Writes to CSS custom properties `--mag-x`, `--mag-y`, `--tilt-x`, `--tilt-y`.
 * The host element should carry the `.tilt-host` class (defined in app.css) to
 * consume those properties as a transform.
 *
 * No-ops on touch devices and when the user prefers reduced motion.
 *
 * @example
 * ```svelte
 * <button use:magnetic class="tilt-host">Reserve for $10</button>
 * <div use:magnetic={{ tilt: true, tiltMax: 4, radius: 600 }} class="tilt-host" style="perspective: 1000px">
 * ```
 */
export function magnetic(
	node: HTMLElement,
	params?: MagneticParams
): { update(p?: MagneticParams): void; destroy(): void } {
	// Gate: SSR, touch devices, and reduced-motion — no-op
	if (typeof window === 'undefined') return { update() {}, destroy() {} };
	if (!window.matchMedia('(pointer: fine)').matches) return { update() {}, destroy() {} };
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
		return { update() {}, destroy() {} };

	let { strength = 0.3, tilt = false, tiltMax = 4, radius = 120 } = params ?? {};
	let rafId: number | null = null;

	function setProps(dx: number, dy: number, rect: DOMRect) {
		const halfW = rect.width / 2;
		const halfH = rect.height / 2;

		const magX = dx * strength;
		const magY = dy * strength;

		node.style.setProperty('--mag-x', `${magX}px`);
		node.style.setProperty('--mag-y', `${magY}px`);

		if (tilt) {
			const rx = -(dy / halfH) * tiltMax;
			const ry = (dx / halfW) * tiltMax;
			node.style.setProperty('--tilt-x', `${rx}deg`);
			node.style.setProperty('--tilt-y', `${ry}deg`);
		}
	}

	function clearProps() {
		node.style.setProperty('--mag-x', '0px');
		node.style.setProperty('--mag-y', '0px');
		node.style.setProperty('--tilt-x', '0deg');
		node.style.setProperty('--tilt-y', '0deg');
		node.style.removeProperty('will-change');
	}

	function onMouseMove(e: MouseEvent) {
		if (rafId !== null) cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(() => {
			const rect = node.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance <= radius) {
				setProps(dx, dy, rect);
			} else {
				clearProps();
			}
			rafId = null;
		});
	}

	function onMouseEnter() {
		node.style.setProperty('will-change', 'transform');
		node.addEventListener('mousemove', onMouseMove);
	}

	function onMouseLeave() {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		node.removeEventListener('mousemove', onMouseMove);
		clearProps();
	}

	node.addEventListener('mouseenter', onMouseEnter);
	node.addEventListener('mouseleave', onMouseLeave);

	return {
		update(p?: MagneticParams) {
			strength = p?.strength ?? 0.3;
			tilt = p?.tilt ?? false;
			tiltMax = p?.tiltMax ?? 4;
			radius = p?.radius ?? 120;
		},
		destroy() {
			if (rafId !== null) cancelAnimationFrame(rafId);
			node.removeEventListener('mouseenter', onMouseEnter);
			node.removeEventListener('mousemove', onMouseMove);
			node.removeEventListener('mouseleave', onMouseLeave);
			clearProps();
		}
	};
}
