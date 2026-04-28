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
		"Pulsyn",
		"Rune 1",
		"PRANA 0.7B",
		"On-Device AI",
		"Privacy-First",
		"Smart Ring",
		"Flutter",
		"SvelteKit",
		"Rust",
		"Open Source",
		"Phoenix, AZ",
		"Local-First",
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
				&nbsp;·&nbsp; Founder &amp; CEO, Pulsyn
				&nbsp;·&nbsp; {age} y/o software engineer in Phoenix, AZ
			</p>

			<h1
				class="font-display fraunces-hover text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-[-0.03em] text-ink leading-[0.97] mb-10 max-w-5xl"
				style="text-wrap: balance;"
			>
				I run Pulsyn. Building hardware that thinks on-device.
			</h1>
		</div>

		<div class="md:columns-2 gap-12 max-w-5xl animate-fade-up delay-100">
			<DropCap>
				<p
					class="font-body text-lg md:text-xl leading-[1.65] text-ink-soft mb-4"
					style="text-wrap: pretty;"
				>
					Pulsyn ships the Rune 1 smart ring with PRANA 0.7B, a 700M-parameter language model that runs on the phone in your pocket. Your heart rate, your sleep, your readiness score, none of it ever leaves your hardware. Privacy as architecture, not as a marketing checkbox.
				</p>
			</DropCap>

			<p
				class="font-body text-base md:text-lg leading-[1.65] text-ink-soft"
				style="text-wrap: pretty;"
			>
				Twenty-two years old, writing Flutter and SvelteKit by day, training a small language model on two million rows of biometric data by night. Reverse-engineered Arizona Mobile ID earlier this year to prove a point about state-issued credentials. The work underneath is unfashionable: SQLCipher AES-256, local-first storage, on-device inference, no cloud round-trip for anything that matters.
			</p>
		</div>

		<div
			class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium animate-fade-up delay-200"
		>
			<a href="/tools" class="editorial-link inline-flex items-center gap-2">
				See the Work <span aria-hidden="true">&rarr;</span>
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
