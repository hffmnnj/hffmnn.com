<script lang="ts">
	import { Kicker, DropCap } from "$lib/components/editorial";
	import {
		HugeiconsIcon,
		CpuIcon,
		Shield01Icon,
		LockKeyIcon,
		AiNetworkIcon,
		FingerPrintIcon
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
						Twenty-two years old, building hardware and training language models out of Phoenix, Arizona. The Rune 1 runs PRANA 0.7B on-device, so biometric data never leaves the wearer's wrist.
					</p>
				</DropCap>

				<blockquote class="pullquote">
					<p>I build things that shouldn't exist yet.</p>
				</blockquote>

				<p class="font-body text-base text-ink-soft leading-[1.65] mt-6">
					Everything I ship is open source. The code is there. The decisions are auditable. The direction is funded by the people using it, not by anyone harvesting the people using it.
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

			<!-- Right: five proof-of-competence rows (5 cols) -->
			<div
				class="md:col-span-5 animate-fade-up delay-200 flex flex-col gap-8 md:gap-10"
			>
				<div
					class="skill-row accent"
					use:reveal
					style="--row-delay: 0ms"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<HugeiconsIcon
								icon={CpuIcon}
								size={18}
								strokeWidth={1.5}
							/>
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
					class="skill-row"
					use:reveal
					style="--row-delay: 100ms"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<HugeiconsIcon
								icon={Shield01Icon}
								size={18}
								strokeWidth={1.5}
							/>
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
					class="skill-row"
					use:reveal
					style="--row-delay: 200ms"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<HugeiconsIcon
								icon={LockKeyIcon}
								size={18}
								strokeWidth={1.5}
							/>
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
					class="skill-row"
					use:reveal
					style="--row-delay: 300ms"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<HugeiconsIcon
								icon={AiNetworkIcon}
								size={18}
								strokeWidth={1.5}
							/>
							<h3
								class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink"
							>
								Full-Stack
							</h3>
						</div>
						<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
							Flutter on the device, SvelteKit on the web, PostgreSQL underneath, Stripe at the edges.
						</p>
					</div>
				</div>

				<div
					class="skill-row"
					use:reveal
					style="--row-delay: 400ms"
				>
					<div class="skill-row-content">
						<div class="flex items-center gap-2 mb-3">
							<HugeiconsIcon
								icon={FingerPrintIcon}
								size={18}
								strokeWidth={1.5}
							/>
							<h3
								class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink"
							>
								Design
							</h3>
						</div>
						<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
							The Liquid Metal design system, with rhythm borrowed from 3Blue1Brown and the Swiss editorial tradition.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
