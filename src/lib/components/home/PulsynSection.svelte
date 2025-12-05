<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { ArrowRight01Icon, SmartWatch01Icon, HeartCheckIcon, MoonCloudIcon, Activity01Icon } from "@hugeicons/core-free-icons";
</script>

<section class="py-16 px-6 border-t border-white/5">
	<div class="max-w-6xl mx-auto">
		<div class="mb-12 animate-fade-up">
			<Badge variant="secondary" class="bg-pulsyn/10 border-pulsyn/20 text-pulsyn mb-4">
				Current Venture
			</Badge>
			<h2 class="font-display text-3xl md:text-4xl font-bold mb-2">
				Pulsyn
			</h2>
			<p class="text-muted-foreground max-w-2xl">
				Building a premium smart ring that makes health tracking accessible.
				Clinical-grade sensors at half the price of competitors.
			</p>
		</div>

		<div class="glass-card p-8 md:p-10 animate-fade-up delay-200">
			<div class="grid md:grid-cols-2 gap-8 items-center">
				<div>
					<h3 class="font-display text-2xl font-semibold mb-4">
						Premium Smart Ring. Half the Price.
					</h3>
					<p class="text-muted-foreground mb-6 leading-relaxed">
						Track sleep, fitness, and recovery with clinical-grade sensors for $149 — save $200+ vs. Oura Ring.
						All essential health tracking included free forever.
					</p>

					<div class="grid grid-cols-2 gap-4 mb-8">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
								<HugeiconsIcon icon={MoonCloudIcon} size={20} class="text-white/70" />
							</div>
							<span class="text-sm text-white/80">Sleep Tracking</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
								<HugeiconsIcon icon={HeartCheckIcon} size={20} class="text-white/70" />
							</div>
							<span class="text-sm text-white/80">Heart Health</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
								<HugeiconsIcon icon={Activity01Icon} size={20} class="text-white/70" />
							</div>
							<span class="text-sm text-white/80">Activity Tracking</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
								<HugeiconsIcon icon={SmartWatch01Icon} size={20} class="text-white/70" />
							</div>
							<span class="text-sm text-white/80">7-60 Day Battery</span>
						</div>
					</div>

					<div class="flex flex-wrap gap-3">
						<Button
							href="https://getpulsyn.com"
							target="_blank"
							rel="noopener noreferrer"
							class="glass-button px-6 py-3 rounded-xl h-auto"
						>
							Visit getpulsyn.com
							<HugeiconsIcon icon={ArrowRight01Icon} size={16} class="ml-2" />
						</Button>
					</div>
				</div>

				<div class="flex justify-center">
					<div class="flex flex-col items-center gap-6">
						<div class="relative">
							<picture>
								<source srcset="/images/ring_black.webp" type="image/webp" />
								<img
									src="/images/ring_black.png"
									alt="Pulsyn Smart Ring"
									class="w-48 md:w-64 h-auto drop-shadow-2xl"
									width="256"
									height="256"
								/>
							</picture>
							<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-pulsyn/15 border border-pulsyn/30 backdrop-blur-sm">
								<span class="font-display text-lg font-bold text-white">$149</span>
							</div>
						</div>
						<a
							href="https://getpulsyn.com/pricing"
							target="_blank"
							rel="noopener noreferrer"
							class="px-6 py-3 rounded-full bg-pulsyn/15 border border-pulsyn/30 text-pulsyn font-medium text-sm hover:bg-pulsyn/25 hover:border-pulsyn/50 transition-all duration-300"
						>
							Pre-order Now →
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
