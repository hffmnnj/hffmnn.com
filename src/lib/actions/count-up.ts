// src/lib/actions/count-up.ts

export interface CountUpParams {
	/** Target number to count to */
	target: number;
	/** Animation duration in ms. Default: 800 */
	duration?: number;
	/** Pad number to N digits with leading zeros. Default: 2 */
	padTo?: number;
}

/**
 * `use:countUp` — animates the host element's `data-n` attribute from "00" to `target`.
 *
 * The existing `.section-counter::before { content: attr(data-n) }` CSS consumes
 * `data-n` reactively — mutating the attribute re-renders the pseudo-element.
 *
 * Triggers once when the element enters the viewport (threshold: 0.5).
 * When reduced motion is preferred, immediately writes the final padded value.
 *
 * @example
 * ```svelte
 * <section
 *   class="section-counter"
 *   data-n="00"
 *   use:countUp={{ target: 3, duration: 800, padTo: 2 }}
 * >
 * ```
 */
export function countUp(
	node: HTMLElement,
	params: CountUpParams
): { update(p: CountUpParams): void; destroy(): void } {
	if (typeof window === 'undefined') return { update() {}, destroy() {} };

	let { target, duration = 800, padTo = 2 } = params;

	function pad(n: number): string {
		return String(Math.round(n)).padStart(padTo, '0');
	}

	// Reduced motion: instant final value
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.setAttribute('data-n', pad(target));
		return { update() {}, destroy() {} };
	}

	let rafId: number | null = null;
	let startTime: number | null = null;

	function easeOut(t: number): number {
		return 1 - Math.pow(1 - t, 3); // cubic ease-out
	}

	function animate(timestamp: number) {
		if (startTime === null) startTime = timestamp;
		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const current = target * easeOut(progress);
		node.setAttribute('data-n', pad(current));
		if (progress < 1) {
			rafId = requestAnimationFrame(animate);
		} else {
			rafId = null;
		}
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					io.unobserve(node);
					rafId = requestAnimationFrame(animate);
				}
			}
		},
		{ threshold: 0.5 }
	);

	io.observe(node);

	return {
		update(p: CountUpParams) {
			target = p.target;
			duration = p.duration ?? 800;
			padTo = p.padTo ?? 2;
		},
		destroy() {
			if (rafId !== null) cancelAnimationFrame(rafId);
			io.disconnect();
		}
	};
}
