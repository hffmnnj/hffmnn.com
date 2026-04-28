<script lang="ts">
	import { Kicker, IssueTag } from "$lib/components/editorial";
	import { HugeiconsIcon, ArrowUpRight01Icon } from "$lib/icons";

	const features: ReadonlyArray<readonly [string, boolean]> = [
		["Sleep Tracking", true],
		["Heart Health", true],
		["Activity Tracking", false],
		["7-60 Day Battery", false],
	];
</script>

<section
	id="venture-section"
	class="section-counter py-20 md:py-28 px-6 border-t border-rule-strong"
	data-n="04"
>
	<div class="max-w-6xl mx-auto">
		<div class="ornament-break mb-10" aria-hidden="true">
			<span class="editorial-mono text-xs text-ink-faint" style="letter-spacing: 0.2em;"
				>&#10022;</span
			>
		</div>

		<Kicker label="DEPARTMENT  ·  VENTURE" showRule={true} />

		<div
			class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 animate-fade-up"
		>
			<div>
				<IssueTag type="current" value="VENTURE" accent={true} class="mb-4" />
				<h2
					class="font-display fraunces-hover text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-ink leading-[0.93] mb-4"
				>
					Pulsyn
				</h2>
				<p class="font-body text-lg text-ink-soft max-w-xl leading-[1.6]">
					I'm building the Rune 1 from Phoenix. PPG, SpO2, skin temperature, and a 6-axis accelerometer. On-device processing, no subscription, ships Q3 2026.
				</p>
			</div>
			<div class="shrink-0 text-right">
				<span class="editorial-mono text-xs text-ink-faint block mb-1">Starting at</span>
				<span
					class="font-display fraunces-hover font-bold text-6xl md:text-8xl tracking-[-0.04em] text-ink leading-none"
				>
					$149
				</span>
				<span class="editorial-mono text-xs text-ink-faint block mt-1"
					>USD &middot; No subscription</span
				>
			</div>
		</div>

		<div
			class="grid md:grid-cols-2 border border-rule shadow-[0_2px_0_0_var(--ink)] animate-fade-up delay-200"
		>
			<!-- Image side -->
			<div
				class="bg-paper-elevated p-10 md:p-14 flex items-center justify-center min-h-[280px]"
			>
				<picture>
					<source srcset="/images/ring_black.webp" type="image/webp" />
					<img
						src="/images/ring_black.png"
						alt="Pulsyn Rune 1 Smart Ring in Obsidian Black"
						class="w-44 md:w-60 h-auto mix-blend-multiply transition-transform duration-700 hover:scale-105"
						width="256"
						height="256"
					/>
				</picture>
			</div>

			<!-- Copy side -->
			<div class="p-8 md:p-12 border-t md:border-t-0 md:border-l border-rule">
				<h3
					class="font-display text-2xl md:text-3xl font-semibold tracking-[-0.01em] text-ink mb-4"
				>
					Premium Smart Ring. Half the Price.
				</h3>
				<p class="font-body text-base text-ink-soft mb-6 leading-[1.65]">
					PPG, SpO2, temperature, and a 6-axis accelerometer for $149. That's $200+ less than an Oura Ring 4 with no recurring fee. Every health metric stays free, forever.
				</p>

				<ul class="space-y-2.5 mb-8">
					{#each features as [label, featured] (label)}
						<li
							class="flex items-center gap-3 text-sm {featured
								? 'text-ink font-medium'
								: 'text-ink-soft'}"
						>
							<span
								class="w-1.5 h-1.5 rounded-full {featured
									? 'bg-accent'
									: 'bg-rule-strong'} shrink-0"
								aria-hidden="true"
							></span>
							{label}
						</li>
					{/each}
				</ul>

				<div class="flex flex-wrap items-center gap-x-5 gap-y-3">
					<a
						href="https://getpulsyn.com/pricing"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-paper text-sm font-medium rounded-sm hover:bg-accent/90 active:scale-[0.98] transition-all duration-200"
					>
						Pre-order Now
						<HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
					</a>
					<a
						href="https://getpulsyn.com"
						target="_blank"
						rel="noopener noreferrer"
						class="editorial-link text-sm text-ink-soft hover:text-ink"
					>
						Visit getpulsyn.com
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
