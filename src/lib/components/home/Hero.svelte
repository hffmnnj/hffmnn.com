<script lang="ts">
	import { Kicker, DropCap } from "$lib/components/editorial";
	import { reveal, countUp } from "$lib/actions";
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

	let h1El: HTMLElement | undefined;

	onMount(() => {
		// Word-split h1 for per-word variable-font animation (MH3).
		// SSR-safe: original text remains in static HTML; spans only appear post-mount.
		// Preserves anchor elements by cloning them and inserting word spans as children.
		if (h1El) {
			const fullText = (h1El.textContent ?? "").trim();
			h1El.setAttribute("aria-label", fullText);

			// Use TreeWalker to traverse all text nodes while tracking parent anchors
			const walker = document.createTreeWalker(
				h1El,
				NodeFilter.SHOW_TEXT,
				null,
			);

			// Collect all text nodes and their parent anchor info before modifying DOM
			const textNodes: Array<{ node: Text; parentAnchor: HTMLAnchorElement | null }> = [];
			let node: Node | null;
			while ((node = walker.nextNode())) {
				// Find closest anchor ancestor within h1El
				let parentAnchor: HTMLAnchorElement | null = null;
				let el: Element | null = node.parentElement;
				while (el && el !== h1El) {
					if (el.tagName === "A") {
						parentAnchor = el as HTMLAnchorElement;
						break;
					}
					el = el.parentElement;
				}
				// Store reference - anchor is valid if we found one (it's inside h1El by definition)
				textNodes.push({ node: node as Text, parentAnchor });
			}

			// Clear the h1 content
			h1El.textContent = "";

			// Track cloned anchors to avoid recreating them for each word
			const clonedAnchors = new Map<HTMLAnchorElement, HTMLAnchorElement>();
			let wordIndex = 0;

			for (const { node, parentAnchor } of textNodes) {
				const text = node.textContent ?? "";
				const tokens = text.split(/(\s+)/);

				for (const token of tokens) {
					if (token.length === 0) continue;

					if (/^\s+$/.test(token)) {
						// Whitespace goes directly to h1
						h1El.appendChild(document.createTextNode(token));
					} else {
						// Create word span with animation delay
						const span = document.createElement("span");
						span.className = "word";
						span.setAttribute("aria-hidden", "true");
						span.style.setProperty("--word-delay", `${wordIndex * 80}ms`);
						span.textContent = token;

						if (parentAnchor) {
							// Get or create cloned anchor
							let clonedAnchor = clonedAnchors.get(parentAnchor);
							if (!clonedAnchor) {
								clonedAnchor = parentAnchor.cloneNode(false) as HTMLAnchorElement;
								clonedAnchor.textContent = "";
								clonedAnchors.set(parentAnchor, clonedAnchor);
								h1El.appendChild(clonedAnchor);
							}
							clonedAnchor.appendChild(span);
						} else {
							h1El.appendChild(span);
						}
						wordIndex++;
					}
				}
			}
		}
	});
</script>

<section
	id="hero-section"
	class="section-counter hero-has-bg pt-16 md:pt-28 pb-16 md:pb-24 px-6"
	data-n="00"
	use:countUp={{ target: 1 }}
>
	<!-- Background image layer — warm editorial overlay -->
	<div class="hero-bg-layer" aria-hidden="true">
		<picture>
			<source srcset="/images/hero_bg.webp" type="image/webp" />
			<img
				src="/images/hero_bg.jpg"
				alt=""
				class="hero-bg-img"
				loading="eager"
				decoding="async"
				fetchpriority="high"
			/>
		</picture>
		<div class="hero-bg-overlay"></div>
	</div>

	<div class="max-w-6xl mx-auto relative" style="z-index: 1;">
		<Kicker label="FEATURE  ·  PORTFOLIO" showRule={true} />

		<div class="animate-fade-up">
			<p class="editorial-byline text-sm mb-5">
				By <span class="text-ink not-italic font-medium">James Hoffmann</span>
				&nbsp;·&nbsp; Founder &amp; CEO, Pulsyn
				&nbsp;·&nbsp; {age} y/o software engineer in Phoenix, AZ
			</p>

			<h1
				bind:this={h1El}
				class="font-display fraunces-hover word-split text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-[-0.03em] text-ink leading-[0.97] mb-10 max-w-5xl"
				style="text-wrap: balance;"
			>
				I run <a href="https://getpulsyn.com" class="text-accent link-persistent-underline">Pulsyn.</a> Building hardware that thinks on-device.
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
				I spend most of my time curating the best datasets possible for health and wellness. When the data I need does not exist, I build synthetic datasets to fill the gaps. Reverse-engineered Arizona Mobile ID earlier this year to prove a point about state-issued credentials. The work underneath is unfashionable: SQLCipher AES-256, local-first storage, on-device inference, no cloud round-trip for anything that matters.
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
	<div class="ticker-wrap mt-16 md:mt-24 -mx-6 md:mx-0 reveal-clip relative" style="z-index: 1;" use:reveal>
		<span class="ticker-live" aria-hidden="true">
			<span class="ticker-live-dot"></span>
			<span>LIVE</span>
		</span>
		<div class="flex-1 overflow-hidden">
			<div class="ticker-track" aria-hidden="true">
				{#each [0, 1] as loop (loop)}
					{#each tickerTerms as term (`${loop}-${term}`)}
						<span class="ticker-item">{term}</span>
					{/each}
				{/each}
			</div>
		</div>
	</div>
</section>
