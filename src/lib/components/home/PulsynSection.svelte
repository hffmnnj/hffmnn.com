<script lang="ts">
	import { Kicker, IssueTag } from "$lib/components/editorial";
	import { HugeiconsIcon, ArrowUpRight01Icon } from "$lib/icons";
	import { magnetic, countUp } from "$lib/actions";

	const features: ReadonlyArray<readonly [string, boolean]> = [
		["Sleep Tracking", true],
		["Heart Health", true],
		["Milo AI · On Device", true],
		["7-Day Battery (60 with case)", false],
	];
</script>

<section
	id="venture-section"
	class="section-counter py-20 md:py-28 px-6 border-t border-rule-strong"
	data-n="00"
	use:countUp={{ target: 5 }}
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
					Building the Rune 1 from Phoenix. PPG, SpO2, skin temperature, and a 3-axis accelerometer. Milo runs on-device, no subscription. Ships Q3 2026.
				</p>
			</div>
			<div class="shrink-0 text-right">
				<span class="inline-flex items-center gap-1.5 editorial-mono text-[10px] text-accent mb-2">
					<span class="ticker-live-dot" aria-hidden="true"></span>
					PRE-ORDER OPEN
				</span>
				<span class="editorial-mono text-xs text-ink-faint block mb-1">Reserve for</span>
				<span
					class="font-display fraunces-hover font-bold text-6xl md:text-8xl tracking-[-0.04em] text-ink leading-none"
				>
					$10
				</span>
				<span class="editorial-mono text-xs text-ink-faint block mt-1"
					>Ships at $160 &middot; Retail $200</span
				>
			</div>
		</div>

		<div style="perspective: 1000px">
			<div
				class="grid md:grid-cols-2 border border-rule shadow-[0_2px_0_0_var(--ink)] animate-fade-up delay-200 tilt-host"
				use:magnetic={{ strength: 0, tilt: true, tiltMax: 4, radius: 600 }}
			>
				<!-- Image side: full-bleed editorial photo, no padding -->
				<div class="overflow-hidden min-h-[320px] md:min-h-[400px]">
					<picture>
					<source srcset="/images/pulsyn_hero.webp" type="image/webp" />
					<img
						src="/images/pulsyn_hero.png"
						alt="Pulsyn Rune 1 smart ring"
						class="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
						width="800"
						height="600"
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
						PPG, SpO2, temperature, and a 3-axis accelerometer. Milo, the on-device AI health assistant, runs on PRANA 0.7B with no internet required. Core tracking is free forever. Pre-order ships at $160, retail $200.
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
							href="https://getpulsyn.com"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-paper text-sm font-medium rounded-sm hover:bg-accent/90 active:scale-[0.98] transition-all duration-200"
						>
							Reserve for $10
							<span class="relative -top-[1px]"><HugeiconsIcon icon={ArrowUpRight01Icon} size={16} /></span>
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

				<!-- Editorial stat bar: spans both columns at md+, sits below copy on mobile -->
				<div class="md:col-span-2 flex items-stretch divide-x divide-rule border-t border-rule">
					<div class="flex-1 px-4 md:px-6 py-3 text-center">
						<span class="editorial-mono text-[10px] text-ink-faint block mb-0.5">BATTERY</span>
						<span class="font-display text-xs md:text-sm font-semibold text-ink">7 days · 60 with case</span>
					</div>
					<div class="flex-1 px-4 md:px-6 py-3 text-center">
						<span class="editorial-mono text-[10px] text-ink-faint block mb-0.5">WATERPROOF</span>
						<span class="font-display text-xs md:text-sm font-semibold text-ink">5ATM</span>
					</div>
					<div class="flex-1 px-4 md:px-6 py-3 text-center">
						<span class="editorial-mono text-[10px] text-ink-faint block mb-0.5">SHIPS</span>
						<span class="font-display text-xs md:text-sm font-semibold text-ink">Q3 2026</span>
					</div>
					<div class="flex-1 px-4 md:px-6 py-3 text-center">
						<span class="editorial-mono text-[10px] text-ink-faint block mb-0.5">ON-DEVICE AI</span>
						<span class="font-display text-xs md:text-sm font-semibold text-ink">Milo · PRANA 0.7B</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
