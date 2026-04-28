<script lang="ts">
	import { Kicker, DropCap } from "$lib/components/editorial";
	import {
		HugeiconsIcon,
		CpuIcon,
		Shield01Icon,
		LockKeyIcon,
		AiNetworkIcon
	} from "$lib/icons";
	import { reveal, countUp } from "$lib/actions";
</script>

<section
	id="about-section"
	class="section-counter py-20 md:py-28 px-6 border-t border-rule"
	data-n="00"
	use:countUp={{ target: 2 }}
>
	<div class="max-w-6xl mx-auto">
		<Kicker label="ABOUT" showRule={true} />

		<div class="grid md:grid-cols-12 gap-10 md:gap-16 mt-10">
			<!-- Left: lede + pull quote (7 cols) -->
			<div class="md:col-span-7 animate-fade-up">
				<DropCap>
					<p
						class="font-body text-xl md:text-2xl leading-[1.55] text-ink mb-8"
						style="text-wrap: pretty;"
					>
						Based in Phoenix, Arizona, building hardware and training language models. The Rune 1 runs PRANA 0.7B on-device, so biometric data never leaves the wearer's wrist.
					</p>
				</DropCap>

				<div class="stance my-8" use:reveal={{ threshold: 0.2 }}>
					<p
						class="editorial-mono text-xs text-ink-faint mb-4"
						style="letter-spacing: 0.18em;"
					>
						STANCE
					</p>
					<ol class="stance-list">
						<li class="stance-row" style="--row-delay: 0ms">
							<span class="stance-num">01</span>
							<span class="stance-text">
								Local-first, or it doesn&rsquo;t ship.
							</span>
						</li>
						<li class="stance-row" style="--row-delay: 90ms">
							<span class="stance-num">02</span>
							<span class="stance-text">
								Open source standards, even when the code isn&rsquo;t.
							</span>
						</li>
						<li class="stance-row" style="--row-delay: 180ms">
							<span class="stance-num">03</span>
							<span class="stance-text">
								The user funds the direction. No one else gets a vote.
							</span>
						</li>
						<li class="stance-row" style="--row-delay: 270ms">
							<span class="stance-num">04</span>
							<span class="stance-text">
								Hardware is the only honest privacy boundary.
							</span>
						</li>
					</ol>
				</div>

				<p class="font-body text-base text-ink-soft leading-[1.65] mt-6">
					Not everything I ship is open source, but I believe in open source standards. The code is there. The decisions are auditable. The direction is funded by the people using it, not by anyone harvesting the people using it.
				</p>

				<!-- MineXO callout: scale/audience proof -->
				<div class="border-t border-rule pt-4 mt-6">
					<p
						class="editorial-mono text-xs text-ink-faint mb-2"
						style="letter-spacing: 0.12em;"
					>
						BEFORE THIS &middot; MINEXO
					</p>
					<p class="font-body text-sm text-ink-soft leading-[1.65]">
						A Minecraft server that peaked at 800+ concurrent players and stacked 200M+ views across YouTube and TikTok. Same instinct, different surface: build the thing, find the audience, ship into the noise.
					</p>
				</div>
			</div>

			<!-- Right: four proof-of-competence rows (5 cols) — vertically centered -->
			<div
				class="md:col-span-5 animate-fade-up delay-200 flex flex-col justify-center gap-8 md:gap-10"
			>
				<div
					class="skill-row skill-colored"
					use:reveal
					style="--row-delay: 0ms; --skill-color: oklch(72% 0.14 72);"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<span class="relative -top-[2px]" style="color: oklch(72% 0.14 72);">
								<HugeiconsIcon icon={CpuIcon} size={18} strokeWidth={1.5} />
							</span>
							<h3
								class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink"
							>
								On-Device AI
							</h3>
						</div>
						<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
							PRANA 0.7B and Qwen 3.5 4B fine-tuned for health inference, running locally on the Rune 1.
						</p>
					</div>
				</div>

				<div
					class="skill-row skill-colored"
					use:reveal
					style="--row-delay: 100ms; --skill-color: oklch(58% 0.12 240);"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<span class="relative -top-[2px]" style="color: oklch(58% 0.12 240);">
								<HugeiconsIcon icon={Shield01Icon} size={18} strokeWidth={1.5} />
							</span>
							<h3
								class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink"
							>
								Privacy Architecture
							</h3>
						</div>
						<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
							SQLCipher AES-256 over a local-first storage model. No cloud round-trips for sensor data, ever.
						</p>
					</div>
				</div>

				<div
					class="skill-row skill-colored"
					use:reveal
					style="--row-delay: 200ms; --skill-color: oklch(55% 0.09 105);"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<span class="relative -top-[2px]" style="color: oklch(55% 0.09 105);">
								<HugeiconsIcon icon={LockKeyIcon} size={18} strokeWidth={1.5} />
							</span>
							<h3
								class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink"
							>
								Reverse Engineering
							</h3>
						</div>
						<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
							Android APK analysis with ADB workflows. Most recent target: Arizona's mobile ID stack.
						</p>
					</div>
				</div>

				<div
					class="skill-row skill-colored"
					use:reveal
					style="--row-delay: 300ms; --skill-color: oklch(50% 0.18 25);"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<span class="relative -top-[2px]" style="color: oklch(50% 0.18 25);">
								<HugeiconsIcon icon={AiNetworkIcon} size={18} strokeWidth={1.5} />
							</span>
							<h3
								class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink"
							>
								Full-Stack
							</h3>
						</div>
						<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
							Offline-first Flutter apps, reactive SvelteKit dashboards, cryptographically secured PostgreSQL and serverless orchestration.
						</p>
					</div>
				</div>

			</div>
		</div>
	</div>
</section>

<style>
	/* Skill row color — per-entry accent via --skill-color custom property */
	:global(.skill-row.skill-colored)::before {
		background: var(--skill-color, var(--accent));
	}

	/* STANCE manifest — newspaper-style numbered principles.
	   Reuses border-draw-down animation pattern from skill-row.
	   All transform/opacity. Reduced-motion safe via global media query. */
	.stance {
		border-block: 1px solid var(--rule);
		padding-block: 1.25rem;
	}

	.stance-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0;
	}

	.stance-row {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: baseline;
		column-gap: 1.25rem;
		padding-block: 0.75rem;
		position: relative;
	}

	.stance-row + .stance-row {
		border-top: 1px solid color-mix(in oklch, var(--rule) 70%, transparent);
	}

	/* Accent draw-in rail — left edge, animates on reveal */
	.stance-row::before {
		content: "";
		position: absolute;
		left: -0.75rem;
		top: 0.65rem;
		bottom: 0.65rem;
		width: 2px;
		background: var(--accent);
		transform: scaleY(0);
		transform-origin: top;
		opacity: 0.7;
	}

	:global(.stance.is-visible) .stance-row::before {
		animation: border-draw-down 360ms cubic-bezier(0.16, 1, 0.3, 1) var(--row-delay, 0ms) forwards;
	}

	.stance-num {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums lining-nums;
		font-size: 0.6875rem;
		letter-spacing: 0.12em;
		color: var(--ink-faint);
		padding-top: 0.15em;
		opacity: 0;
		transform: translateY(4px);
	}

	.stance-text {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
		line-height: 1.45;
		color: var(--ink);
		text-wrap: pretty;
		font-variation-settings: "opsz" 24, "SOFT" 50, "wght" 420;
		opacity: 0;
		transform: translateY(4px);
	}

	:global(.stance.is-visible) .stance-num,
	:global(.stance.is-visible) .stance-text {
		animation: stance-fade 420ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--row-delay, 0ms) + 200ms) both;
	}

	@keyframes stance-fade {
		from { opacity: 0; transform: translateY(4px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	@media (prefers-reduced-motion: reduce) {
		.stance-row::before {
			animation: none !important;
			transform: scaleY(1) !important;
		}
		.stance-num,
		.stance-text {
			animation: none !important;
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
