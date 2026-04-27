<script lang="ts">
	import { onMount } from "svelte";

	type Section = { id: string; label: string };

	const sections: ReadonlyArray<Section> = [
		{ id: "hero-section", label: "Front Page" },
		{ id: "about-section", label: "About" },
		{ id: "tools-section", label: "Tools" },
		{ id: "venture-section", label: "Venture" },
	];

	let active = $state<string>(sections[0]?.label ?? "");

	onMount(() => {
		const pairs = sections
			.map((s) => ({ s, el: document.getElementById(s.id) }))
			.filter((x): x is { s: Section; el: HTMLElement } => x.el !== null);

		if (pairs.length === 0) return;

		const io = new IntersectionObserver(
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

		pairs.forEach((x) => io.observe(x.el));
		return () => io.disconnect();
	});
</script>

<div
	class="fixed left-3 top-1/2 -translate-y-1/2 hidden xl:block z-40 pointer-events-none"
	aria-hidden="true"
>
	<span
		class="editorial-mono text-[10px] text-ink-faint opacity-60"
		style="writing-mode: vertical-rl; transform: rotate(180deg); letter-spacing: 0.18em; text-transform: uppercase; transition: opacity 300ms ease;"
	>
		{active}
	</span>
</div>
