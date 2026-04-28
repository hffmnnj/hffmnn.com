// src/lib/actions/parallax.ts

export interface ParallaxParams {
	/** How much the element moves relative to scroll (0–1). Default: 0.3 */
	speed?: number;
	/** Max px translation in either direction. Default: 60 */
	clamp?: number;
}

/**
 * `use:parallax` — scroll-driven vertical translate.
 *
 * Writes `--parallax-y` CSS custom property (declared as `@property` in app.css).
 * Host element should carry `.parallax-host` class to consume the property.
 *
 * Pauses the RAF loop when the element is off-screen (internal IO gate).
 * No-ops when the user prefers reduced motion.
 *
 * @example
 * ```svelte
 * <img use:parallax={{ speed: 0.3, clamp: 50 }} class="parallax-host w-full h-full object-cover" />
 * ```
 */
export function parallax(
	node: HTMLElement,
	params?: ParallaxParams
): { update(p?: ParallaxParams): void; destroy(): void } {
	if (typeof window === 'undefined') return { update() {}, destroy() {} };
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
		return { update() {}, destroy() {} };

	let { speed = 0.3, clamp = 60 } = params ?? {};
	let rafId: number | null = null;
	let inView = false;

	function tick() {
		if (!inView) {
			rafId = null;
			return;
		}
		const rect = node.getBoundingClientRect();
		const viewportCenter = window.innerHeight / 2;
		const elementCenter = rect.top + rect.height / 2;
		const distance = (viewportCenter - elementCenter) * speed;
		const clamped = Math.max(-clamp, Math.min(clamp, distance));
		node.style.setProperty('--parallax-y', `${clamped}px`);
		rafId = requestAnimationFrame(tick);
	}

	function startLoop() {
		if (rafId === null) rafId = requestAnimationFrame(tick);
	}

	function stopLoop() {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				inView = entry.isIntersecting;
				if (inView) startLoop();
				else stopLoop();
			}
		},
		{ threshold: 0 }
	);

	io.observe(node);

	return {
		update(p?: ParallaxParams) {
			speed = p?.speed ?? 0.3;
			clamp = p?.clamp ?? 60;
		},
		destroy() {
			stopLoop();
			io.disconnect();
			node.style.removeProperty('--parallax-y');
		}
	};
}
