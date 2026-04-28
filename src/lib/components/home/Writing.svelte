<script lang="ts">
	import { Kicker } from "$lib/components/editorial";
	import { countUp } from "$lib/actions";
</script>

<section
	id="writing-section"
	class="section-counter py-20 md:py-28 px-6 border-t border-rule"
	data-n="00"
	use:countUp={{ target: 4 }}
>
	<div class="max-w-6xl mx-auto">
		<Kicker label="RECENT WRITING" showRule={true} />

		<div class="grid md:grid-cols-12 gap-10 md:gap-16 mt-10">
			<!-- Left rail: editorial mono label (3 cols) -->
			<div class="md:col-span-3 animate-fade-up">
				<p
					class="editorial-mono text-xs text-ink-faint"
					style="letter-spacing: 0.15em;"
				>
					TECHNICAL RESEARCH
				</p>
				<p class="editorial-mono text-xs text-ink-faint mt-2">
					Pulsyn Journal
				</p>
			</div>

			<!-- Right: the entry (9 cols) -->
			<div class="md:col-span-9 animate-fade-up delay-200">
				<a
					href="https://getpulsyn.com/blog/reverse-engineering-arizona-mobile-id"
					target="_blank"
					rel="noopener noreferrer"
					class="group block"
				>
					<!-- Cover image -->
					<div class="relative overflow-hidden border border-rule mb-6" style="height: 280px;">
						<picture>
							<source srcset="/images/az_mobile_id.webp" type="image/webp" />
							<img
								src="/images/az_mobile_id.jpg"
								alt="Close-up macro iris — Arizona Mobile ID article cover"
								class="w-full h-full object-cover object-left transition-transform duration-700 group-hover:scale-[1.03]"
								loading="lazy"
								decoding="async"
							/>
						</picture>
						<!-- Thin ink-wash gradient so the headline below reads against paper -->
						<div
							class="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
							style="background: linear-gradient(to top, var(--paper) 0%, transparent 100%);"
							aria-hidden="true"
						></div>
					</div>

					<div class="border-t border-rule pt-6">
						<h3
							class="font-display fraunces-hover text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-ink leading-[1.05] mb-4 group-hover:text-accent transition-colors duration-200"
						>
							Reverse-Engineering the Arizona Mobile ID
							<span
								aria-hidden="true"
								class="inline-block ml-2 text-ink-faint group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
								>&nearr;</span
							>
						</h3>
						<p
							class="font-body text-base md:text-lg text-ink-soft leading-[1.65] max-w-2xl"
							style="text-wrap: pretty;"
						>
							I decompiled the state's mDL app, traced the ADB data flows,
							and documented what actually gets stored on the device.
						</p>
						<p class="editorial-mono text-xs text-ink-faint mt-5">
							getpulsyn.com <span aria-hidden="true">&nearr;</span>
						</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</section>
