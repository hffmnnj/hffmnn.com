<script lang="ts">
	import { Kicker, IssueTag } from "$lib/components/editorial";
</script>

<section class="py-16 md:py-24 px-6 border-t border-rule-strong">
	<div class="max-w-6xl mx-auto">
		<Kicker label="DEPARTMENT  ·  VENTURE" showRule={true} />

		<div class="flex items-end justify-between mb-10 animate-fade-up">
			<div>
				<IssueTag type="current" value="VENTURE" accent={true} class="mb-4" />
				<h2
					class="font-display text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-ink mb-2"
				>
					Pulsyn
				</h2>
				<p class="font-body text-lg text-ink-soft max-w-2xl leading-[1.6]">
					Building a premium smart ring that makes health tracking accessible. Clinical-grade sensors at half the price of competitors.
				</p>
			</div>
		</div>

		<div class="grid md:grid-cols-2 border border-rule animate-fade-up delay-200">
			<!-- Image side -->
			<div
				class="bg-paper-elevated p-8 md:p-12 flex items-center justify-center"
			>
				<picture>
					<source srcset="/images/ring_black.webp" type="image/webp" />
					<img
						src="/images/ring_black.png"
						alt="Pulsyn Smart Ring"
						class="w-44 md:w-56 h-auto mix-blend-multiply"
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
				<p class="font-body text-base text-ink-soft mb-6 leading-[1.6]">
					Track sleep, fitness, and recovery with clinical-grade sensors for $149 — save $200+ vs. Oura Ring. All essential health tracking included free forever.
				</p>

				<ul class="space-y-3 mb-8">
					<li class="flex items-center gap-3 text-sm text-ink">
						<span
							class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
							aria-hidden="true"
						></span>
						Sleep Tracking
					</li>
					<li class="flex items-center gap-3 text-sm text-ink">
						<span
							class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
							aria-hidden="true"
						></span>
						Heart Health
					</li>
					<li class="flex items-center gap-3 text-sm text-ink">
						<span
							class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
							aria-hidden="true"
						></span>
						Activity Tracking
					</li>
					<li class="flex items-center gap-3 text-sm text-ink">
						<span
							class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
							aria-hidden="true"
						></span>
						7-60 Day Battery
					</li>
				</ul>

				<div class="flex flex-wrap items-baseline gap-x-6 gap-y-3">
					<div class="flex items-baseline gap-2">
						<span class="font-display text-3xl md:text-4xl font-bold text-ink">$149</span>
						<span class="editorial-mono text-xs text-ink-faint">USD</span>
					</div>
					<a
						href="https://getpulsyn.com/pricing"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-paper text-sm font-medium rounded-sm hover:bg-accent/90 transition-colors"
					>
						Pre-order Now <span aria-hidden="true">&rarr;</span>
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
