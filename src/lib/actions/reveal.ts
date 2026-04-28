export interface RevealParams {
	threshold?: number;
	rootMargin?: string;
	class?: string;
	once?: boolean;
}

/**
 * `use:reveal` — IntersectionObserver-driven scroll reveal action.
 *
 * Adds the target class (default: `is-visible`) to the host element when it
 * enters the viewport. Immediately resolves if the user prefers reduced motion.
 *
 * @example
 * ```svelte
 * <div use:reveal class="reveal-clip">...</div>
 * <div use:reveal={{ threshold: 0.3, class: 'in-view', once: false }}>...</div>
 * ```
 */
export function reveal(
	node: HTMLElement,
	params?: RevealParams
): { update(p?: RevealParams): void; destroy(): void } {
	const {
		threshold = 0.1,
		rootMargin = '0px',
		class: visibleClass = 'is-visible',
		once = true
	} = params ?? {};

	// SSR / reduced-motion shortcut — immediately visible, skip observer
	if (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		node.classList.add(visibleClass);
		return {
			update() {},
			destroy() {}
		};
	}

	let observer: IntersectionObserver | null = null;

	function observe(p: RevealParams = {}) {
		const t = p.threshold ?? threshold;
		const rm = p.rootMargin ?? rootMargin;
		const cls = p.class ?? visibleClass;
		const o = p.once ?? once;

		observer?.disconnect();

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.classList.add(cls);
						if (o) observer?.unobserve(node);
					} else if (!o) {
						node.classList.remove(cls);
					}
				}
			},
			{ threshold: t, rootMargin: rm }
		);

		observer.observe(node);
	}

	observe(params);

	return {
		update(p?: RevealParams) {
			observe(p);
		},
		destroy() {
			observer?.disconnect();
			observer = null;
		}
	};
}
