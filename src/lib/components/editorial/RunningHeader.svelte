<script lang="ts">
	import { onMount } from "svelte";

	type Section = { id: string; label: string };

	const sections: ReadonlyArray<Section> = [
		{ id: "hero-section", label: "Front Page" },
		{ id: "about-section", label: "About" },
		{ id: "writing-section", label: "Writing" },
		{ id: "tools-section", label: "Tools" },
		{ id: "venture-section", label: "Venture" },
	];

	let active = $state<string>(sections[0]?.label ?? "");
	let isCondensed = $state<boolean>(false);

	onMount(() => {
		const pairs = sections
			.map((s) => ({ s, el: document.getElementById(s.id) }))
			.filter((x): x is { s: Section; el: HTMLElement } => x.el !== null);

		const cleanups: Array<() => void> = [];

		if (pairs.length > 0) {
			const sectionObserver = new IntersectionObserver(
				(entries) => {
					for (const e of entries) {
						if (e.isIntersecting) {
							const found = pairs.find((x) => x.el === e.target);
							if (found) active = found.s.label;
						}
					}
				},
				{ root: null, threshold: 0.3 },
			);

			pairs.forEach((x) => sectionObserver.observe(x.el));
			cleanups.push(() => sectionObserver.disconnect());
		}

		// Condensed-state observer: fires when hero is ~80% scrolled past.
		const heroSection = document.getElementById("hero-section");
		if (heroSection) {
			const condensedObserver = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						isCondensed = !entry.isIntersecting;
					}
				},
				{ root: null, rootMargin: "0px 0px -80% 0px", threshold: 0 },
			);

			condensedObserver.observe(heroSection);
			cleanups.push(() => condensedObserver.disconnect());
		}

		return () => {
			for (const fn of cleanups) fn();
		};
	});
</script>

<div
	class="fixed left-3 top-1/2 -translate-y-1/2 hidden xl:block z-40 pointer-events-none"
	aria-hidden="true"
>
	<span
		class="editorial-mono text-[10px] text-ink-faint opacity-60 {isCondensed
			? 'is-condensed'
			: ''}"
		style="writing-mode: vertical-rl; transform: rotate(180deg); letter-spacing: 0.18em; text-transform: uppercase; transition: font-size 300ms ease, opacity 300ms ease, letter-spacing 300ms ease, transform 300ms ease;"
	>
		{active}
	</span>
</div>
