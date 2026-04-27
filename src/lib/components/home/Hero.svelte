<script lang="ts">
	import { Kicker, DropCap } from "$lib/components/editorial";
	import { onMount } from "svelte";

	const birthYear = 2004;
	const birthMonth = 3; // April (0-indexed)

	function getAge(): number {
		const today = new Date();
		let age = today.getFullYear() - birthYear;
		if (today.getMonth() < birthMonth) {
			age--;
		}
		return age;
	}

	const age = getAge();

	const tickerTerms = [
		"SvelteKit",
		"Rust",
		"Privacy-First",
		"TypeScript",
		"Open Source",
		"Linux",
		"Hyprland",
		"AI Tooling",
		"SEO",
		"System Admin",
		"Smart Ring",
		"Pulsyn",
	];

	onMount(() => {
		const els = document.querySelectorAll(".reveal-clip");
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				}
			},
			{ threshold: 0.1 },
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<section
	id="hero-section"
	class="section-counter pt-16 md:pt-28 pb-16 md:pb-24 px-6"
	data-n="01"
>
	<div class="max-w-6xl mx-auto">
		<Kicker label="FEATURE  ·  PORTFOLIO  ·  ISSUE 04" showRule={true} />

		<div class="animate-fade-up">
			<p class="editorial-byline text-sm mb-5">
				By <span class="text-ink not-italic font-medium">James Hoffmann</span>
				&nbsp;·&nbsp; {age} y/o developer, sysadmin &amp; privacy advocate
			</p>

			<h1
				class="font-display fraunces-hover text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-[-0.03em] text-ink leading-[0.97] mb-10 max-w-5xl"
				style="text-wrap: balance;"
			>
				Building tools for privacy &amp; productivity.
			</h1>
		</div>

		<div class="md:columns-2 gap-12 max-w-5xl animate-fade-up delay-100">
			<DropCap>
				<p
					class="font-body text-lg md:text-xl leading-[1.65] text-ink-soft mb-4"
					style="text-wrap: pretty;"
				>
					Creating elegant, privacy-respecting software. From desktop environments to AI-powered tools, every project is built with attention to detail and a commitment to user sovereignty.
				</p>
			</DropCap>

			<p
				class="font-body text-base md:text-lg leading-[1.65] text-ink-soft"
				style="text-wrap: pretty;"
			>
				Currently building Pulsyn, a premium smart ring that makes health tracking accessible at half the cost. Previously, open-source tools for SEO analysis, multi-LLM council discussions, and a privacy-first Linux desktop environment.
			</p>
		</div>

		<div
			class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium animate-fade-up delay-200"
		>
			<a href="/tools" class="editorial-link inline-flex items-center gap-2">
				View Projects <span aria-hidden="true">&rarr;</span>
			</a>
			<a
				href="https://github.com/hffmnnj"
				target="_blank"
				rel="noopener noreferrer"
				class="editorial-link inline-flex items-center gap-2 text-ink-soft hover:text-ink"
			>
				GitHub
			</a>
		</div>
	</div>

	<!-- Ticker below hero -->
	<div class="ticker-wrap mt-16 md:mt-24 -mx-6 md:mx-0 reveal-clip">
		<div class="ticker-track" aria-hidden="true">
			{#each [0, 1] as loop (loop)}
				{#each tickerTerms as term (`${loop}-${term}`)}
					<span class="ticker-item">{term}</span>
				{/each}
			{/each}
		</div>
	</div>
</section>
